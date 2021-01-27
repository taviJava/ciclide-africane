package com.tavi.cilideafricaneb.demo.persistance.dto;

import com.tavi.cilideafricaneb.demo.persistance.model.Photo;

public class LinkDto {
    private long id;
    private String name;
    private String description;
    private Photo photo;

    public Photo getPhoto() {
        return photo;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
