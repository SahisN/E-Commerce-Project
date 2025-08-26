package com.ecommerce.sell_cart.controller;

import com.ecommerce.sell_cart.config.AppConstants;
import com.ecommerce.sell_cart.model.User;
import com.ecommerce.sell_cart.payload.AddressDTO;
import com.ecommerce.sell_cart.payload.AddressResponse;
import com.ecommerce.sell_cart.service.AddressService;
import com.ecommerce.sell_cart.utils.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @Autowired
    private AuthUtil authUtil;

    @GetMapping("/addresses")
    public ResponseEntity<AddressResponse> createAddress(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_ADDRESS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIRECTION, required = false) String sortDirection
    ) {
        AddressResponse addressResponse = addressService.getAllAddress(pageNumber, pageSize, sortBy, sortDirection);
        return new ResponseEntity<>(addressResponse, HttpStatus.OK);
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO) {
        User user = authUtil.loggedInUser();
        AddressDTO savedAddressDTO = addressService.createAddress(addressDTO, user);

        return new ResponseEntity<>(savedAddressDTO,HttpStatus.CREATED);
    }

    @GetMapping("/address/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId) {
        AddressDTO addressDTO = addressService.getAddressById(addressId);
        return new ResponseEntity<>(addressDTO, HttpStatus.OK);
    }

    @GetMapping("/user/addresses")
    public ResponseEntity<List<AddressDTO>> getAddressByUser() {
        User user = authUtil.loggedInUser();
        List<AddressDTO> addressDTOList = addressService.getUserAddresses(user);
        return new ResponseEntity<>(addressDTOList, HttpStatus.OK);
    }

    @PutMapping("/address/{addressId}")
    public ResponseEntity<AddressDTO> updateAddressById(@PathVariable Long addressId,
                                                        @Valid @RequestBody AddressDTO addressDTO) {
        AddressDTO updatedAddressDTO = addressService.updateAddressById(addressId, addressDTO);
        return new ResponseEntity<>(updatedAddressDTO, HttpStatus.OK);
    }

    @DeleteMapping("/address/{addressId}")
    public ResponseEntity<String> deleteAddressById(@PathVariable Long addressId) {
        String status = addressService.deleteAddress(addressId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

}
