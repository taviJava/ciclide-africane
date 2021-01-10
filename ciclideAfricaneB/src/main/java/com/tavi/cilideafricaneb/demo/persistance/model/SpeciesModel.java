package com.tavi.cilideafricaneb.demo.persistance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class SpeciesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSpecies;
    private String name;
    private String group;
    private String size;
    private String behavior;
    private String associate;
    private String aquarium;
    private String feed;
    private String reproduction;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "species")
    @JsonIgnoreProperties("species")
    private List<Photo> photos;

    public long getIdSpecies() {
        return idSpecies;
    }

    public void setIdSpecies(long idSpecies) {
        this.idSpecies = idSpecies;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getBehavior() {
        return behavior;
    }

    public void setBehavior(String behavior) {
        this.behavior = behavior;
    }

    public String getAssociate() {
        return associate;
    }

    public void setAssociate(String associate) {
        this.associate = associate;
    }

    public String getAquarium() {
        return aquarium;
    }

    public void setAquarium(String aquarium) {
        this.aquarium = aquarium;
    }

    public String getFeed() {
        return feed;
    }

    public void setFeed(String feed) {
        this.feed = feed;
    }

    public String getReproduction() {
        return reproduction;
    }

    public void setReproduction(String reproduction) {
        this.reproduction = reproduction;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }
}
