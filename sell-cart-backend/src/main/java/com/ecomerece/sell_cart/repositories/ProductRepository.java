package com.ecomerece.sell_cart.repositories;

import com.ecomerece.sell_cart.model.Category;
import com.ecomerece.sell_cart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryOrderByPriceAsc(Category category);

    List<Product> findByProductNameLikeIgnoreCase(String keyword);
}
