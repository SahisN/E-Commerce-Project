package com.ecommerce.sell_cart.service.impl;

import com.ecommerce.sell_cart.exceptions.ApiException;
import com.ecommerce.sell_cart.exceptions.ResourceNotFoundException;
import com.ecommerce.sell_cart.model.Category;
import com.ecommerce.sell_cart.payload.CategoryDTO;
import com.ecommerce.sell_cart.payload.CategoryResponse;
import com.ecommerce.sell_cart.repositories.CategoryRepository;
import com.ecommerce.sell_cart.service.CategoryService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortDirection) {
        Sort sortByAndOrder = sortDirection.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();


        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Category> categoryPage = categoryRepository.findAll(pageDetails);

        List<Category> categories = categoryPage.getContent();
        if(categories.isEmpty()) {
            throw new ApiException("No categories available.");
        }

        // mapping every category to categoryDTO i.e (id, name) -> (categoryId, categoryName)
        List<CategoryDTO> categoryDTOS = categories.stream()
                .map(category -> modelMapper
                        .map(category, CategoryDTO.class)).toList();

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOS);
        categoryResponse.setPageNumber(categoryPage.getNumber());
        categoryResponse.setPageSize(categoryPage.getSize());
        categoryResponse.setTotalElements(categoryPage.getTotalElements());
        categoryResponse.setTotalPages(categoryPage.getTotalPages());
        categoryResponse.setLastPage(categoryPage.isLast());


        return categoryResponse;
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);

        Category savedCategoryFromDB = categoryRepository.findByCategoryName(category.getCategoryName());

        if(savedCategoryFromDB != null) {
            throw new ApiException("Category with the name " + categoryDTO.getCategoryName() + " already exists!!!");
        }

        // setting category id to null prevents overlap error between
        // auto generated id and id received from client
        category.setCategoryId(null);
        Category savedCategory = categoryRepository.save(category);

        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO deleteCategory(Long categoryId) {
        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));



        categoryRepository.delete(category);
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId) {

        Category savedCategory = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "Category Id", categoryId));

        Category category = modelMapper.map(categoryDTO, Category.class);

        category.setCategoryId(categoryId);

        savedCategory = categoryRepository.save(category);

        return modelMapper.map(savedCategory, CategoryDTO.class);
    }
}
