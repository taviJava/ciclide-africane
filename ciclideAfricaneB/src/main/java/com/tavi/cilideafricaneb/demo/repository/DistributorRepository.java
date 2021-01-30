package com.tavi.cilideafricaneb.demo.repository;

import com.tavi.cilideafricaneb.demo.persistance.model.DistributorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributorRepository extends JpaRepository<DistributorModel, Long> {
}
