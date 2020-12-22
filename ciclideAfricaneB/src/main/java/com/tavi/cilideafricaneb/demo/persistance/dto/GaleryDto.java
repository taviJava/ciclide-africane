package com.tavi.cilideafricaneb.demo.persistance.dto;

import com.tavi.cilideafricaneb.demo.persistance.model.Photo;

import java.util.List;

public class GaleryDto {

    private long id;
    private String description;
    private List<Photo> photos;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }
}
