package com.tavi.cilideafricaneb.demo.repository;

import com.tavi.cilideafricaneb.demo.persistance.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, String> {
}
