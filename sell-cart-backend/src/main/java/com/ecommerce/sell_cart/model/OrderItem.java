package com.ecommerce.sell_cart.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Integer quantity;
    private double discount;
    private double orderProductPrice;

    public OrderItem(Product product, Integer quantity, double discount, double orderProductPrice, Order order) {
        this.product = product;
        this.quantity = quantity;
        this.discount = discount;
        this.orderProductPrice = orderProductPrice;
        this.order = order;
    }
}
