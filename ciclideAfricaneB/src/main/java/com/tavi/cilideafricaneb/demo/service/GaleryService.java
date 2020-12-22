package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.repository.GaleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GaleryService {
    @Autowired
    private GaleryRepository galeryRepository;
}
