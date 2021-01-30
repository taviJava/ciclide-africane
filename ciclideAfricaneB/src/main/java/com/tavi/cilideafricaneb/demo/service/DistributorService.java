package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.DistributorDto;
import com.tavi.cilideafricaneb.demo.persistance.model.DistributorModel;
import com.tavi.cilideafricaneb.demo.repository.DistributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DistributorService {
    @Autowired
    private DistributorRepository distributorRepository;


    private DistributorDto getDto(DistributorModel distributorModel){
        DistributorDto distributorDto = new DistributorDto();
        distributorDto.setId(distributorModel.getId());
        distributorDto.setAddress(distributorModel.getAddress());
        distributorDto.setCity(distributorModel.getCity());
        distributorDto.setName(distributorModel.getName());
        distributorDto.setPhone(distributorModel.getPhone());
        return distributorDto;
    }

    private DistributorModel getModel(DistributorDto distributorDto){
        DistributorModel distributorModel = new DistributorModel();
        distributorModel.setAddress(distributorDto.getAddress());
        distributorModel.setCity(distributorDto.getCity());
        distributorModel.setName(distributorDto.getName());
        distributorModel.setPhone(distributorDto.getPhone());
        return distributorModel;
    }

    public void add(DistributorDto distributorDto){
        distributorRepository.save(getModel(distributorDto));
    }
    public void delete(long id){
        distributorRepository.deleteById(id);
    }

    public List<DistributorDto> getAll(){
        List<DistributorModel> distributorModels = distributorRepository.findAll();
        List<DistributorDto> distributorDtos = new ArrayList<>();
        for (DistributorModel distributorModel: distributorModels){
            distributorDtos.add(getDto(distributorModel));
        }
        return distributorDtos;
    }
}
