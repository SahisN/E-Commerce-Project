package com.ecommerce.sell_cart.service.impl;

import com.ecommerce.sell_cart.exceptions.ApiException;
import com.ecommerce.sell_cart.exceptions.ResourceNotFoundException;
import com.ecommerce.sell_cart.model.Address;
import com.ecommerce.sell_cart.model.User;
import com.ecommerce.sell_cart.payload.AddressDTO;
import com.ecommerce.sell_cart.payload.AddressResponse;
import com.ecommerce.sell_cart.repositories.AddressRepository;
import com.ecommerce.sell_cart.repositories.UserRepository;
import com.ecommerce.sell_cart.service.AddressService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO, Address.class);

        List<Address> addressList = user.getAddresses();
        addressList.add(address);
        user.setAddresses(addressList);

        address.setUser(user);
        Address savedAddress = addressRepository.save(address);

        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public AddressResponse getAllAddress(Integer pageNumber, Integer pageSize, String sortBy, String sortDirection) {
        // set sort order direction based on sortOrder
        Sort sortByAndOrder = sortDirection.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // setting Pageable object based on pageNumber, pageSize, and sortByAndOrder
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        // fetch all address based on Pageable Object
        Page<Address> addressPage = addressRepository.findAll(pageDetails);

        // check if address list is empty (validation)
        List<Address> addresses = addressPage.getContent();
        if(addresses.isEmpty()) {
            throw new ApiException("No addresses available");
        }

        // convert the address list into address DTO list
       List<AddressDTO> addressDTOList = addresses.stream().map(address -> modelMapper
                .map(address, AddressDTO.class)).toList();

        return new AddressResponse(
                addressDTOList,
                addressPage.getNumber(),
                addressPage.getSize(),
                addressPage.getTotalElements(),
                addressPage.getTotalPages(),
                addressPage.isLast()
        );

    }

    @Override
    public AddressDTO getAddressById(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getUserAddresses(User user) {
       List<Address> addresses = user.getAddresses();
       return addresses.stream().map(address -> modelMapper.map(address, AddressDTO.class)).toList();
    }

    @Override
    public AddressDTO updateAddressById(Long addressId, AddressDTO addressDTO) {
        // get saved address by id
        Address savedAddress = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

       // modify saved address with incoming address data
        savedAddress.setCity(addressDTO.getCity());
        savedAddress.setState(addressDTO.getState());
        savedAddress.setCountry(addressDTO.getCountry());
        savedAddress.setBuildingName(addressDTO.getBuildingName());
        savedAddress.setZipcode(addressDTO.getZipcode());
        savedAddress.setStreet(addressDTO.getStreet());

        // re-save the saved address with modified data
        Address updatedAddress = addressRepository.save(savedAddress);

        // update address from user side by removing existing old address and adding new address
        User user = savedAddress.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        user.getAddresses().add(updatedAddress);
        userRepository.save(user);

        return modelMapper.map(updatedAddress, AddressDTO.class);
    }

    @Transactional
    @Override
    public String deleteAddress(Long addressId) {
        // check if user exist
        Address savedAddress = addressRepository.findById(addressId)
                        .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        // delete address from user side
        User user = savedAddress.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        userRepository.save(user);

        addressRepository.deleteById(addressId);

        return "Address with id " + savedAddress.getAddressId() + " delete successfully!";
    }

}
