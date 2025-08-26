package com.ecommerce.sell_cart.service;

import com.ecommerce.sell_cart.model.User;
import com.ecommerce.sell_cart.payload.AddressDTO;
import com.ecommerce.sell_cart.payload.AddressResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    AddressResponse getAllAddress(Integer pageNumber, Integer pageSize, String sortBy, String sortDirection);

    AddressDTO getAddressById(Long addressId);

    List<AddressDTO> getUserAddresses(User user);

    AddressDTO updateAddressById(Long addressId, @Valid AddressDTO addressDTO);

    String deleteAddress(Long addressId);
}
