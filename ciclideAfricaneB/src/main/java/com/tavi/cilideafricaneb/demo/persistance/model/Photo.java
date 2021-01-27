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

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("photo")
    private HomePageModel homePage;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("photo")
    private ContactModel contactModel;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("photo")
    private LinkModel linkModel;


    public Photo(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;

    }

    public Photo() {

    }

    public HomePageModel getHomePage() {
        return homePage;
    }

    public void setHomePage(HomePageModel homePage) {
        this.homePage = homePage;
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

    public ContactModel getContactModel() {
        return contactModel;
    }

    public void setContactModel(ContactModel contactModel) {
        this.contactModel = contactModel;
    }

    public LinkModel getLinkModel() {
        return linkModel;
    }

    public void setLinkModel(LinkModel linkModel) {
        this.linkModel = linkModel;
    }
}
