package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.HomePageDto;
import com.tavi.cilideafricaneb.demo.persistance.model.HomePageModel;
import com.tavi.cilideafricaneb.demo.persistance.model.Photo;
import com.tavi.cilideafricaneb.demo.repository.HomePageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HomePageService {
    @Autowired
    private HomePageRepository homePageRepository;

    public void save(HomePageDto homePageDto) {
        homePageRepository.deleteAll();
        HomePageModel homePageModel = new HomePageModel();
        homePageModel.setDescription(homePageDto.getDescription());
        homePageModel.setPhoto(homePageDto.getPhoto());
        homePageRepository.save(homePageModel);
    }

    public void delete(long id) {
        homePageRepository.deleteById(id);
    }

    public List<HomePageDto> getAll() {
        List<HomePageModel> homePageModelList = homePageRepository.findAll();
        List<HomePageDto> homePageDtoList = new ArrayList<>();
        for (HomePageModel homePageModel : homePageModelList) {
            HomePageDto homePageDto = new HomePageDto();
            homePageDto.setId(homePageModel.getId());
            homePageDto.setDescription(homePageModel.getDescription());
            homePageDto.setPhoto(homePageModel.getPhoto());
            homePageDtoList.add(homePageDto);
        }
        return homePageDtoList;
    }

    public HomePageDto getById(long id) {
        HomePageModel homePageModel = homePageRepository.findById(id).orElse(null);
        HomePageDto homePageDto = new HomePageDto();
        homePageDto.setId(homePageModel.getId());
        homePageDto.setDescription(homePageModel.getDescription());
        homePageDto.setPhoto(homePageModel.getPhoto());
        return homePageDto;

    }

    public void update(HomePageDto homePageDto) {
        Optional<HomePageModel> homePageModelOptional = homePageRepository.findById(homePageDto.getId());
        if (homePageModelOptional.isPresent()) {
            HomePageModel homePageModel = homePageModelOptional.get();
            homePageModel.setId(homePageDto.getId());
            homePageModel.setDescription(homePageDto.getDescription());
            homePageModel.setPhoto(homePageDto.getPhoto());
            homePageRepository.save(homePageModel);
        }
    }
}


