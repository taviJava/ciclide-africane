package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.persistance.files.ResponseFile;
import com.tavi.cilideafricaneb.demo.persistance.model.SpeciesModel;
import com.tavi.cilideafricaneb.demo.repository.SpeciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SpeciesService {
    @Autowired
    private SpeciesRepository speciesRepository;


    public void save(SpeciesDto speciesDto){
        speciesRepository.save(getModel(speciesDto));
    }

    public void update(SpeciesDto speciesDto){
        Optional<SpeciesModel> speciesModelOptional = speciesRepository.findById(speciesDto.getId());
        if (speciesModelOptional.isPresent()){
            SpeciesModel speciesModel = getModel(speciesDto);
            speciesModel.setIdSpecies(speciesDto.getId());
            speciesRepository.save(speciesModel);
        }
    }

    public List<SpeciesDto> getAll(){
        List<SpeciesModel> speciesModels = speciesRepository.findAll();
        List<SpeciesDto> speciesDtos = new ArrayList<>();
        for (SpeciesModel speciesModel: speciesModels){
            speciesDtos.add(getDto(speciesModel));
        }
        return speciesDtos;
    }

    public List<SpeciesDto> search(String keyword){
        System.out.println(keyword);

        List<SpeciesModel> speciesModels = speciesRepository.findByNameContaining(keyword);
        List<SpeciesDto> speciesDtos = new ArrayList<>();
        for (SpeciesModel speciesModel: speciesModels){
            speciesDtos.add(getDto(speciesModel));
        }
        return speciesDtos;
    }

    public SpeciesDto getOne(long id){
        Optional<SpeciesModel> speciesModelOptional = speciesRepository.findById(id);
        SpeciesDto speciesDto = new SpeciesDto();
        if (speciesModelOptional.isPresent()){
            SpeciesModel speciesModel = speciesModelOptional.get();
           speciesDto = getDto(speciesModel);
        }
        return speciesDto;
    }

    public void delete(long id){
        speciesRepository.deleteById(id);
    }

    private SpeciesModel getModel(SpeciesDto speciesDto){
        SpeciesModel speciesModel = new SpeciesModel();
            speciesModel.setAquarium(speciesDto.getAquarium());
            speciesModel.setAssociate(speciesDto.getAssociate());
            speciesModel.setBehavior(speciesDto.getBehavior());
            speciesModel.setFeed(speciesDto.getFeed());
            speciesModel.setGroup(speciesDto.getGroup());
            speciesModel.setName(speciesDto.getName());
            speciesModel.setSize(speciesDto.getSize());
            speciesModel.setReproduction(speciesDto.getReproduction());
        return speciesModel;
    }

    private SpeciesDto getDto(SpeciesModel speciesModel){
        SpeciesDto speciesDto = new SpeciesDto();
        speciesDto.setId(speciesModel.getIdSpecies());
        speciesDto.setAquarium(speciesModel.getAquarium());
        speciesDto.setAssociate(speciesModel.getAssociate());
        speciesDto.setBehavior(speciesModel.getBehavior());
        speciesDto.setFeed(speciesModel.getFeed());
        speciesDto.setGroup(speciesModel.getGroup());
        speciesDto.setName(speciesModel.getName());
        speciesDto.setReproduction(speciesModel.getReproduction());
        speciesDto.setSize(speciesModel.getSize());
        return speciesDto;
    }

}
