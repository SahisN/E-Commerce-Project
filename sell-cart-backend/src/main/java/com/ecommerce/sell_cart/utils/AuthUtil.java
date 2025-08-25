package com.ecommerce.sell_cart.utils;

import com.ecommerce.sell_cart.model.User;
import com.ecommerce.sell_cart.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    @Autowired
    UserRepository userRepository;

    public String loggedInEmail() {
        // get instance of auth
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // search for user email using auth instance
        User user = userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + authentication.getName()));

        return user.getEmail();
    }

    public Long loggedInUserId() {
        // get instance of auth
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // search for user email using auth instance
        User user = userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + authentication.getName()));

        return user.getUserId();
    }

    public User loggedInUser() {
        // get instance of auth
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // search for user email using auth instance

        return userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + authentication.getName()));
    }
}
