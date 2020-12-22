package com.tavi.cilideafricaneb.demo.repository;

import com.tavi.cilideafricaneb.demo.persistance.model.GaleryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GaleryRepository extends JpaRepository<GaleryModel, Long> {
}
