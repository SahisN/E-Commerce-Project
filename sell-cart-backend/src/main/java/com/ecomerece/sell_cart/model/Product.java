package com.ecomerece.sell_cart.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    @NotBlank
    @Size(min = 1, message = "Product description must contain at least 1 character")
    private String productName;

    @NotBlank
    private String image;

    @NotBlank
    private String description;

    @NotNull
    @Min(value=1, message = "quantity must be 1 or more")
    private Integer quantity;

    @NotNull
    @Min(value=1, message = "price must be 1 or more")
    private double price;

    @NotNull
    @Min(value = 1, message = "discount must be 1 or more")
    private double discount;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private double specialPrice;


    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
