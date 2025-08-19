package com.ecomerece.sell_cart.service;

import com.ecomerece.sell_cart.model.Product;
import com.ecomerece.sell_cart.payload.ProductDTO;
import com.ecomerece.sell_cart.payload.ProductResponse;

public interface ProductService {
    ProductDTO addProduct(Long categoryId, Product product);

    ProductResponse getAllProducts();

    ProductResponse searchByCategory(Long categoryId);

    ProductResponse searchProductByKeyword(String keyword);

    ProductDTO updateProduct(Long productId, Product product);

    ProductDTO deleteProduct(Long productId);
}
