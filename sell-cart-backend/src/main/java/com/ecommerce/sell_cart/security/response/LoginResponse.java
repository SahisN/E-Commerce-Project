package com.ecommerce.sell_cart.security.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class LoginResponse {
    private Long id;
    private String username;
    private List<String> roles;
}

