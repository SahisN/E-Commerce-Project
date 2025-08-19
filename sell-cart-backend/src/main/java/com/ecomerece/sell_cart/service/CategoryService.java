package com.ecomerece.sell_cart.service;

import com.ecomerece.sell_cart.model.Category;
import com.ecomerece.sell_cart.payload.CategoryDTO;
import com.ecomerece.sell_cart.payload.CategoryResponse;

public interface CategoryService {
    CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    CategoryDTO createCategory(CategoryDTO categoryDTO);

    CategoryDTO deleteCategory(Long categoryId);

    CategoryDTO updateCategory(CategoryDTO category, Long categoryId);
}
