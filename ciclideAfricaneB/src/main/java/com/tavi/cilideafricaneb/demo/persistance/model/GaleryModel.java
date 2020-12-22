package com.tavi.cilideafricaneb.demo.persistance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
@Entity
public class GaleryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String description;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "galery")
    @JsonIgnoreProperties("galery")
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
