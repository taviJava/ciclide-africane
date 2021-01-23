package com.tavi.cilideafricaneb.demo.repository;

import com.tavi.cilideafricaneb.demo.persistance.model.SpeciesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SpeciesRepository extends JpaRepository<SpeciesModel,Long> {
    @Query("SELECT s FROM SpeciesModel s WHERE s.name like %?1% ")
    List<SpeciesModel> search(String name);
    @Query(value = "SELECT * FROM species WHERE species.name LIKE %?1%", nativeQuery = true)
    List<SpeciesModel> search2(String key);

    List<SpeciesModel> getAllByName(String dfd);

    List<SpeciesModel> findByNameContaining(String name);
    @Query(value = "SELECT * FROM galery WHERE description  %?1%", nativeQuery = true)
    List<SpeciesModel> test(String test);
}
