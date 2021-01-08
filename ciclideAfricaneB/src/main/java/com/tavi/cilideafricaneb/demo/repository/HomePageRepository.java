package com.tavi.cilideafricaneb.demo.repository;

import com.tavi.cilideafricaneb.demo.persistance.model.HomePageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomePageRepository extends JpaRepository<HomePageModel, Long> {
}
