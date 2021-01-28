package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.files.ResponseFile;
import com.tavi.cilideafricaneb.demo.persistance.files.ResponseMessage;
import com.tavi.cilideafricaneb.demo.persistance.model.HomePageModel;
import com.tavi.cilideafricaneb.demo.persistance.model.LinkModel;
import com.tavi.cilideafricaneb.demo.persistance.model.Photo;
import com.tavi.cilideafricaneb.demo.repository.HomePageRepository;
import com.tavi.cilideafricaneb.demo.repository.LinkRepository;
import com.tavi.cilideafricaneb.demo.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @Autowired
    private LinkRepository linkRepository;
    @Autowired
    private HomePageRepository homePageRepository;

    @PostMapping("/photos")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("photo") MultipartFile file) {
        String message;
        try {
            photoService.storePhotosSpecies(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @PostMapping("/photos/galery")
    public ResponseEntity<ResponseMessage> uploadFileGalery(@RequestParam("photo") MultipartFile file) {
        String message;
        try {
            photoService.storePhotosGalery(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @PostMapping("/photos/link")
    public ResponseEntity<ResponseMessage> uploadFileLink(@RequestParam("photo") MultipartFile file) {
        String message;
        try {
            photoService.storePhotosLink(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @PostMapping("/photos/homepage")
    public ResponseEntity<ResponseMessage> uploadFileHomePage(@RequestParam("photo") MultipartFile file) {
        String message;
        try {
            photoService.storePhotosHomepage(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/photop/{id}")
    public ResponseEntity<byte[]> getFileLink(@PathVariable String id) {
        Photo photo = photoService.getPhoto(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getName() + "\"")
                .body(photo.getData());
    }

    @GetMapping("/species/photos/{id}")
    public ResponseEntity<List<ResponseFile>> getListFiles(@PathVariable(name = "id") Long id) {
        List<ResponseFile> files = photoService.getAllSpeciesphotos(id).map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/photos/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }


    @GetMapping("/photos/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Photo photo = photoService.getPhoto(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getName() + "\"")
                .body(photo.getData());
    }

    @GetMapping("/galery/photos/{id}")
    public ResponseEntity<List<ResponseFile>> getListFilesGalery(@PathVariable(name = "id") Long id) {
        List<ResponseFile> files = photoService.getAllGaleryphotos(id).map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/photos/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }


    @GetMapping("/photos/homepage/{id}")
    public ResponseEntity<byte[]> getFileHomepage(@PathVariable String id) {
        Photo photo = photoService.getPhoto(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getName() + "\"")
                .body(photo.getData());
    }


    @GetMapping("/homepage/photos/{id}")
    public ResponseEntity<List<ResponseFile>> getHomepagePhoto(@PathVariable(name = "id") Long id) {
        List<ResponseFile> files = new ArrayList<>();
        Optional<HomePageModel> homePageModelOptional = homePageRepository.findById(id);
        if (homePageModelOptional.isPresent()) {
            if (homePageModelOptional.get().getPhoto() != null) {
                files = photoService.getHomepagephotos(id).map(dbFile -> {
                    String fileDownloadUri = ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("photos/homepage/")
                            .path(dbFile.getId())
                            .toUriString();
                    return new ResponseFile(
                            dbFile.getName(),
                            fileDownloadUri,
                            dbFile.getType(),
                            dbFile.getData().length);
                }).collect(Collectors.toList());

            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/link/photos/{id}")
    public ResponseEntity<List<ResponseFile>> getLinkPhoto(@PathVariable(name = "id") Long id) {
        List<ResponseFile> files = new ArrayList<>();
        Optional<LinkModel> linkModelOptional = linkRepository.findById(id);
        if (linkModelOptional.isPresent()) {
            if (linkModelOptional.get().getPhoto() != null) {
                files = photoService.getLinkPhoto(id).map(dbFile -> {
                    String fileDownloadUri = ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("/photos/link/")
                            .path(dbFile.getId())
                            .toUriString();
                    return new ResponseFile(
                            dbFile.getName(),
                            fileDownloadUri,
                            dbFile.getType(),
                            dbFile.getData().length);
                }).collect(Collectors.toList());

            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/photos/link/{id}")
    public ResponseEntity<byte[]> getFilelink(@PathVariable String id) {
        Photo photo = photoService.getPhoto(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getName() + "\"")
                .body(photo.getData());
    }


}
