package com.ecomerece.sell_cart.service.impl;

import com.ecomerece.sell_cart.exceptions.ResourceNotFoundException;
import com.ecomerece.sell_cart.model.Category;
import com.ecomerece.sell_cart.model.Product;
import com.ecomerece.sell_cart.payload.ProductDTO;
import com.ecomerece.sell_cart.payload.ProductResponse;
import com.ecomerece.sell_cart.repositories.CategoryRepository;
import com.ecomerece.sell_cart.repositories.ProductRepository;
import com.ecomerece.sell_cart.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProductDTO addProduct(Long categoryId, Product product) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> {
                    return new ResourceNotFoundException("Category", "CategoryId", categoryId);
                });

        product.setCategory(category);


        // calculate special price using discount percent
        double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());

        product.setImage("default.png");
        product.setSpecialPrice(specialPrice);
        Product savedProduct = productRepository.save(product);

        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductResponse getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = products
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);

        return productResponse;
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId) {
        Category category = categoryRepository
                .findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Category", "categoryId", categoryId));

        // gets all product that fits in a certain category
        List<Product> products = productRepository.findByCategoryOrderByPriceAsc(category);
        System.out.println(products);

        // Transform product list into productDTO list
        List<ProductDTO> productDTOS = products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class)).toList();

        // create product response and add the productDTO in the response
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);

        return productResponse;
    }

    @Override
    public ProductResponse searchProductByKeyword(String keyword) {
        // get list of product that include keyword in the product name
        List<Product> products = productRepository.findByProductNameLikeIgnoreCase(keyword);

        // convert the product list into productDTOS list
        List<ProductDTO> productDTOS = products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class)).toList();

        // create product response and add productDTO list in product response
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);

        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, Product product) {
        // Get the existing product from DB
        Product productFromDb = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product", productId));

        // Update the product info with one in request body
        productFromDb.setProductName(product.getProductName());
        productFromDb.setDescription(product.getDescription());
        productFromDb.setQuantity(product.getQuantity());
        productFromDb.setDiscount(product.getDiscount());
        productFromDb.setPrice(product.getPrice());

        double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
        productFromDb.setSpecialPrice(specialPrice);

        // Save it to the database
        Product savedProduct = productRepository.save(productFromDb);

        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        // find the product using id
        // if it doesn't exist return resource not found exception
        Product productFromDb = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        // if product with the productId exist then delete the product
        productRepository.delete(productFromDb);

        return modelMapper.map(productFromDb, ProductDTO.class);
    }


}
