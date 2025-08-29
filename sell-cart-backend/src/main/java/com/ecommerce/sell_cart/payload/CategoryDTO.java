package com.ecommerce.sell_cart.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    @Schema(description = "Category ID", example = "1")
    private Long categoryId;

    @Schema(description = "Category name for category", example = "computer")
    private String categoryName;
}
