package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.GaleryDto;
import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.persistance.model.GaleryModel;
import com.tavi.cilideafricaneb.demo.persistance.model.Photo;
import com.tavi.cilideafricaneb.demo.persistance.model.SpeciesModel;
import com.tavi.cilideafricaneb.demo.repository.GaleryRepository;
import com.tavi.cilideafricaneb.demo.repository.PhotoRepository;
import com.tavi.cilideafricaneb.demo.repository.SpeciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PhotoService {
    @Autowired
    private SpeciesRepository speciesRepository;
    @Autowired
    private GaleryRepository galeryRepository;
    @Autowired
    private PhotoRepository photoRepository;

    public Photo storePhotosSpecies(MultipartFile file, long id) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());
        Optional<SpeciesModel> speciesModelOptional = speciesRepository.findById(id);
        if (speciesModelOptional.isPresent()) {
            photo.setSpecies(speciesModelOptional.get());
        }
        return photoRepository.save(photo);
    }
    public Photo storePhotosGalery(MultipartFile file, long id) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());
        Optional<GaleryModel> galeryModelOptional = galeryRepository.findById(id);
        if (galeryModelOptional.isPresent()) {
            photo.setGalery(galeryModelOptional.get());
        }
        return photoRepository.save(photo);
    }
    public Photo getPhoto(String id) {
        return photoRepository.findById(id).get();
    }

    public Stream<Photo> getAllphotos() {
        return photoRepository.findAll().stream();
    }

    public Stream<Photo> getAllSpeciesphotos(SpeciesDto speciesDto) {
        SpeciesModel speciesModel = new SpeciesModel();
        Optional<SpeciesModel> speciesModelOptional = speciesRepository.findById(speciesDto.getId());
        if (speciesModelOptional.isPresent()) {
            speciesModel = speciesModelOptional.get();
        }
        return speciesModel.getPhotos().stream();
    }
    public Stream<Photo> getAllGaleryphotos(GaleryDto galeryDto) {
        GaleryModel galeryModel = new GaleryModel();
        Optional<GaleryModel> galeryModelOptional = galeryRepository.findById(galeryDto.getId());
        if (galeryModelOptional.isPresent()) {
            galeryModel = galeryModelOptional.get();
        }
        return galeryModel.getPhotos().stream();
    }
}

