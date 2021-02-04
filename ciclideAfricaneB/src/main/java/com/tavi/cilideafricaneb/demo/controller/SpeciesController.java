package com.tavi.cilideafricaneb.demo.controller;

import com.tavi.cilideafricaneb.demo.persistance.dto.SpeciesDto;
import com.tavi.cilideafricaneb.demo.persistance.model.SpeciesModel;
import com.tavi.cilideafricaneb.demo.service.SpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class SpeciesController {
    @Autowired
    private SpeciesService speciesService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admspecies")
    public void save(@RequestBody SpeciesDto speciesDto) {
        speciesService.save(speciesDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admspecies")
    public void update(@RequestBody SpeciesDto speciesDto) {
        speciesService.update(speciesDto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admspecies/{id}")
    public void delete(@PathVariable(name = "id") long id) {
        speciesService.delete(id);
    }

    @GetMapping("/species")
    public List<SpeciesDto> getAll() {
        return speciesService.getAll();
    }

    @GetMapping("/find/search/{keyword}/list")
    public List<SpeciesDto> search(@PathVariable(name = "keyword") String keyword) {
        return speciesService.search(keyword);
    }

    @GetMapping("/species/{id}")
    public SpeciesDto getOne(@PathVariable(name = "id") long id) {
        return speciesService.getOne(id);
    }

        @GetMapping("/speciespaginate/{pagenr}")
    public List<SpeciesDto> getAllByNameAndPage(@PathVariable(name = "pagenr") int pagenr){
        return speciesService.sortAndPage(pagenr);
    }
//    @GetMapping("/page/{pageNo}")
//    public String viewPage(@PathVariable(name = "pageNo") int pageNo, Model model) {
//        int pageSz = 5;
//        Page<SpeciesModel> page = speciesService.findPaginated(pageNo, pageSz);
//
//        List<SpeciesModel> listSpecies = page.getContent();
//
//        model.addAttribute("currentPage", pageNo);
//        model.addAttribute("totalPages", page.getTotalPages());
//        model.addAttribute("totalItems", page.getTotalElements());
//        model.addAttribute("listProducts", listSpecies);
//
//        return "index";
//    }
}
