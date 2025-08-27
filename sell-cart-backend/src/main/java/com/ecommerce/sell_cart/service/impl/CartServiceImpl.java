package com.ecommerce.sell_cart.service.impl;

import com.ecommerce.sell_cart.exceptions.ApiException;
import com.ecommerce.sell_cart.exceptions.ResourceNotFoundException;
import com.ecommerce.sell_cart.model.Cart;
import com.ecommerce.sell_cart.model.CartItem;
import com.ecommerce.sell_cart.model.Product;
import com.ecommerce.sell_cart.payload.CartDTO;
import com.ecommerce.sell_cart.payload.ProductDTO;
import com.ecommerce.sell_cart.repositories.CartItemRepository;
import com.ecommerce.sell_cart.repositories.CartRepository;
import com.ecommerce.sell_cart.repositories.ProductRepository;
import com.ecommerce.sell_cart.service.CartService;
import com.ecommerce.sell_cart.utils.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthUtil authUtil;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        // find existing cart or create one
        Cart cart = createOrRetrieveCart();

        // Retrieve Product Details
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        // Perform Validations
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cart.getCartId(), productId);

        if(cartItem != null) {
            throw new ApiException("Product" + product.getProductName() + "already exist in the cart");
        }

        if (product.getQuantity() == 0) {
            throw new ApiException(product.getProductName() + " is not available");
        }

        if(quantity > product.getQuantity()) {
            throw new ApiException(product.getProductName() + " of " + quantity + " is not available");
        }

        // Create Cart Item
        CartItem newCartItem = new CartItem();
        newCartItem.setCart(cart);
        newCartItem.setQuantity(quantity);
        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProduct(product);
        newCartItem.setProductPrice(product.getSpecialPrice());

        // Save Cart Item & post-processing on product & cart
        cartItemRepository.save(newCartItem);

        product.setQuantity(product.getQuantity());
        cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice() * quantity));

        cartRepository.save(cart);

        // Return updated cart
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productStream = cartItems.stream().map(item -> {
            ProductDTO map = modelMapper.map(item.getProduct(), ProductDTO.class);
            map.setQuantity(item.getQuantity());
            return map;
        });

        cartDTO.setProducts(productStream.toList());

        return cartDTO;
    }

    @Override
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();

        if(carts.isEmpty()) {
            throw new ApiException("No cart exist");
        }

        // if cart is not empty, transform List of Carts to List of CartDTO
        List<CartDTO> cartDTOs = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            cart.getCartItems().forEach(item -> item.getProduct().setQuantity(item.getQuantity()));

            // cart requires ProductDTO
            // get list of cart item from cart
            // get product from list from each cart item and using model mapper to transform it into productDTO
            List<ProductDTO> products = cart.getCartItems().stream().map(
                         item -> modelMapper.map(item.getProduct(), ProductDTO.class)).toList();
                 cartDTO.setProducts(products);
                 return cartDTO;
        }).toList();

        return cartDTOs;
    }

    @Override
    public CartDTO getCart(String emailId, Long cartId) {
        Cart cart = cartRepository.findCartByEmailAndCartId(emailId, cartId);
        if(cart == null) {
            throw new ResourceNotFoundException("Cart", "cardId", cartId);
        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cart.getCartItems().forEach(item -> item.getProduct().setQuantity(item.getQuantity()));
        List<ProductDTO> products = cart.getCartItems().stream()
                .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class)).toList();

        cartDTO.setProducts(products);

        return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateProductQuantityInCart(Long productId, int quantity) {
        // retrieve emailId from authUtil to get user cart id
        String emailId = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmail(emailId);
        Long cartId = userCart.getCartId();

        // check if cart exist
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        // validate product quantity with user cart product quantity
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);
        if(cartItem == null) {
            throw new ApiException("Product " + product.getProductName() + " not available in the cart!!!");
        }

        // if user decrements product to zero in cart then remove the product from cart
        int newQuantity = cartItem.getQuantity() + quantity;

        if (product.getQuantity() == 0) {
            throw new ApiException(product.getProductName() + " is not available");
        }

        System.out.println(newQuantity);
        System.out.println("productQuantity: " + product.getQuantity());

        if(product.getQuantity() < newQuantity) {
            throw new ApiException(product.getProductName() + " of " + quantity + "is not available");
        }

        if( newQuantity == 0) {
            deleteProductFromCart(cartId, productId);
        }

        else {
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscount());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepository.save(cart);

            //CartItem updatedItem = cartItemRepository.save(cartItem);

        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();

        Stream<ProductDTO> productStream = cartItems.stream().map(item -> {
            ProductDTO prod = modelMapper.map(item.getProduct(), ProductDTO.class);
            prod.setQuantity(item.getQuantity());
            return prod;
        });

        cartDTO.setProducts(productStream.toList());
        return cartDTO;
    }

    @Transactional
    @Override
    public String deleteProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cardId", cartId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);
        if(cartItem == null) {
            throw new ResourceNotFoundException("Product", "productId", productId);
        }


        // update the cart total price by total price of delete cart item
        cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity()));

        cartItemRepository.deleteCartItemByProductIdAndCartId(cartId, productId);

        return "Product " + cartItem.getProduct().getProductName() + " removed from cart";
    }

    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product", productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if(cartItem != null) {
            throw new ApiException("Product " + product.getProductName() + " not available in cart!");
        }

        // remove old price
        double cartPrice = cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity());
        cartItem.setProductPrice(product.getSpecialPrice());

        // recalculate new price
        cart.setTotalPrice(cartPrice + cartItem.getProductPrice() * cartItem.getQuantity());

        cartItem = cartItemRepository.save(cartItem);
    }


    private Cart createOrRetrieveCart() {
        // retrieve user cart by their email
        Cart userExistingCart = cartRepository.findCartByEmail(authUtil.loggedInEmail());

        // if cart already exist, then return existing cart;
        if(userExistingCart != null) {
            return userExistingCart;
        }

        // if cart doesn't exist, then return a new cart with default values
        Cart cart = new Cart();
        cart.setTotalPrice(0.00);
        cart.setUser(authUtil.loggedInUser());

        return cartRepository.save(cart);
    }
}
