package com.tavi.cilideafricaneb.demo.persistance.dto;

import com.tavi.cilideafricaneb.demo.persistance.model.Photo;

public class HomePageDto {
    private long id;
    private String description;
    private Photo photo;

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

    public Photo getPhoto() {
        return photo;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }
}
