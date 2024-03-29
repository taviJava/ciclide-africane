package com.tavi.cilideafricaneb.demo.repository;

import com.tavi.cilideafricaneb.demo.persistance.model.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactModel, Long> {
}
