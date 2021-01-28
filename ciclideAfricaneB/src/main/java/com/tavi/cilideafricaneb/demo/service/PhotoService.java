package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.model.*;
import com.tavi.cilideafricaneb.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Service
public class PhotoService {
    @Autowired
    private SpeciesRepository speciesRepository;
    @Autowired
    private GaleryRepository galeryRepository;
    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private HomePageRepository homePageRepository;
    @Autowired
    private LinkRepository linkRepository;

    public Photo storePhotosSpecies(MultipartFile file) throws IOException {
        List<SpeciesModel> clientModelList = (List<SpeciesModel>) speciesRepository.findAll();
        SpeciesModel speciesModel = clientModelList.get(clientModelList.size() - 1);
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());
        photo.setSpecies(speciesModel);

        return photoRepository.save(photo);
    }

    public Photo storePhotosGalery(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        GaleryModel galeryModel = galeryRepository.findAll().get(galeryRepository.findAll().size() - 1);
        Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());
        photo.setGalery(galeryModel);
        return photoRepository.save(photo);
    }

    public Photo storePhotosHomepage(MultipartFile file) throws IOException, InterruptedException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());
        TimeUnit.SECONDS.sleep(3);
        List<HomePageModel> homePageModelList = homePageRepository.findAll();
        HomePageModel homePageModel = homePageModelList.get(homePageModelList.size() - 1);
        photo.setHomePage(homePageModel);
        return photoRepository.save(photo);
    }

    public Photo storePhotosLink(MultipartFile file) throws IOException, InterruptedException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());
        TimeUnit.SECONDS.sleep(3);
        List<LinkModel> linkModelList = linkRepository.findAll();
        LinkModel linkModel = linkModelList.get(linkModelList.size() - 1);
        photo.setLinkModel(linkModel);
        return photoRepository.save(photo);
    }

    public Photo getPhoto(String id) {
        return photoRepository.findById(id).get();
    }

    public Stream<Photo> getAllphotos() {
        return photoRepository.findAll().stream();
    }

    public Stream<Photo> getAllSpeciesphotos(long id) {
        SpeciesModel speciesModel = new SpeciesModel();
        Optional<SpeciesModel> speciesModelOptional = speciesRepository.findById(id);
        if (speciesModelOptional.isPresent()) {
            speciesModel = speciesModelOptional.get();
        }
        return speciesModel.getPhotos().stream();
    }

    public Stream<Photo> getAllGaleryphotos(long id) {
        GaleryModel galeryModel = new GaleryModel();
        Optional<GaleryModel> galeryModelOptional = galeryRepository.findById(id);
        if (galeryModelOptional.isPresent()) {
            galeryModel = galeryModelOptional.get();
        }
        return galeryModel.getPhotos().stream();
    }

    public Stream<Photo> getHomepagephotos(long id) {
        HomePageModel homePageModel = homePageRepository.findById(id).orElse(null);
        List<Photo> list = new ArrayList<>();
        list.add(homePageModel.getPhoto());
        return list.stream();
    }

    public Stream<Photo> getLinkPhoto(long id) {
        LinkModel linkModel = linkRepository.findById(id).orElse(null);
        List<Photo> list = new ArrayList<>();
        list.add(linkModel.getPhoto());
        return list.stream();
    }

}

