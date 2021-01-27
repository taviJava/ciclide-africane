package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.ContactDto;
import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.persistance.model.ContactModel;
import com.tavi.cilideafricaneb.demo.persistance.model.SpeciesModel;
import com.tavi.cilideafricaneb.demo.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentNavigableMap;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    public void save(ContactDto contactDto) {
        contactRepository.save(getModel(contactDto));
    }

    public void update(ContactDto contactDto) {
        Optional<ContactModel> contactModelOptional = contactRepository.findById(contactDto.getId());
        if (contactModelOptional.isPresent()) {
            ContactModel contactModel = getModel(contactDto);
            contactRepository.save(contactModel);
        }
    }

    public List<ContactDto> getAll() {
        List<ContactModel> contactModelList = contactRepository.findAll();
        List<ContactDto> contactDtoList = new ArrayList<>();
        for (ContactModel contactModel : contactModelList) {
            contactDtoList.add(getDto(contactModel));
        }
        return contactDtoList;
    }

    public void delete(long id) {
        contactRepository.deleteById(id);
    }


    private ContactModel getModel(ContactDto contactDto) {
        ContactModel contactModel = new ContactModel();
        contactModel.setCompanyInformation(contactDto.getCompanyInformation());
        contactModel.setDescription(contactDto.getDescription());
        contactModel.setEmail(contactDto.getAddress());
        contactModel.setAddress(contactDto.getAddress());
        contactModel.setPhone(contactDto.getPhone());
        contactRepository.save(contactModel);
        return contactModel;
    }

    private ContactDto getDto(ContactModel contactModel) {
        ContactDto contactDto = new ContactDto();
        contactDto.setId(contactModel.getId());
        contactDto.setCompanyInformation(contactModel.getCompanyInformation());
        contactDto.setDescription(contactModel.getDescription());
        contactDto.setEmail(contactModel.getEmail());
        contactDto.setAddress(contactModel.getAddress());
        contactDto.setPhone(contactModel.getPhone());
        return contactDto;
    }
}
