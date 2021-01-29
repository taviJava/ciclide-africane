package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.GaleryDto;
import com.tavi.cilideafricaneb.demo.persistance.model.GaleryModel;
import com.tavi.cilideafricaneb.demo.repository.GaleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GaleryService {
    @Autowired
    private GaleryRepository galeryRepository;

    public void save(GaleryDto galeryDto){

        galeryRepository.save(getModel(galeryDto));
    }

    public void update(GaleryDto galeryDto){
        galeryRepository.save(getModel(galeryDto));
    }

    public void delete(long id){
        galeryRepository.deleteById(id);
    }

    public List<GaleryDto> getAll(){
        List<GaleryModel> galeryModels = galeryRepository.findAll();
        List<GaleryDto> galeryDtos = new ArrayList<>();
        for (GaleryModel galeryModel: galeryModels){
            galeryDtos.add(getDto(galeryModel));
        }
        return galeryDtos;
    }

    public GaleryDto getOne(long id){
        Optional<GaleryModel> galeryModelOptional = galeryRepository.findById(id);
        GaleryDto galeryDto = new GaleryDto();
        if (galeryModelOptional.isPresent()){
            galeryDto = getDto(galeryModelOptional.get());
        }
        return galeryDto;
    }
    private GaleryModel getModel(GaleryDto galeryDto){
        GaleryModel galeryModel = new GaleryModel();
        Optional<GaleryModel> galeryModelOptional = galeryRepository.findById(galeryDto.getId());
        if (galeryModelOptional.isPresent()){
            galeryModel.setId(galeryDto.getId());
        }
            galeryModel.setDescription(galeryDto.getDescription());
            return galeryModel;
    }
    private GaleryDto getDto(GaleryModel galeryModel){
        GaleryDto galeryDto = new GaleryDto();
        galeryDto.setId(galeryModel.getId());
        galeryDto.setDescription(galeryModel.getDescription());
        return galeryDto;
    }
}
