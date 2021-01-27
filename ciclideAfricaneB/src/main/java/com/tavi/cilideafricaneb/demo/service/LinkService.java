package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.LinkDto;
import com.tavi.cilideafricaneb.demo.persistance.model.LinkModel;
import com.tavi.cilideafricaneb.demo.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LinkService {
    @Autowired
    private LinkRepository linkRepository;

    public void save(LinkDto linkDto) {
        LinkModel linkModel = new LinkModel();
        linkModel.setName(linkDto.getName());
        linkModel.setDescription(linkDto.getDescription());
        linkModel.setPhoto(linkDto.getPhoto());
        linkRepository.save(linkModel);
    }

    public List<LinkDto> getAll() {
        List<LinkModel> linkModelList = linkRepository.findAll();
        List<LinkDto> linkDtoList = new ArrayList<>();
        for (LinkModel linkModel : linkModelList) {
            LinkDto linkDto = new LinkDto();
            linkDto.setId(linkModel.getId());
            linkDto.setName(linkModel.getName());
            linkDto.setDescription(linkModel.getDescription());
            linkDto.setPhoto(linkModel.getPhoto());
            linkDtoList.add(linkDto);
        }
        return linkDtoList;

    }

    public void delete(long id) {
        linkRepository.deleteById(id);
    }
}
