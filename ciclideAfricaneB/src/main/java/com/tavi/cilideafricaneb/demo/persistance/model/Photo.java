package com.tavi.cilideafricaneb.demo.persistance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Photo {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;
    @Lob
    private byte[] data;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("photos")
    private SpeciesModel species;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("photos")
    private GaleryModel galery;

    public Photo( String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;

    }

    public Photo() {

    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public SpeciesModel getSpecies() {
        return species;
    }

    public void setSpecies(SpeciesModel species) {
        this.species = species;
    }

    public GaleryModel getGalery() {
        return galery;
    }

    public void setGalery(GaleryModel galery) {
        this.galery = galery;
    }
}
