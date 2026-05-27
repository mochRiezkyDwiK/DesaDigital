package com.DigitalVillageHub.demo.persistence;

import com.DigitalVillageHub.demo.model.entity.Pengaduan;
import com.DigitalVillageHub.demo.model.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PengaduanRepository extends JpaRepository<Pengaduan, Long> {

    @EntityGraph(attributePaths = {"user"})
    List<Pengaduan> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"user"})
    List<Pengaduan> findByWargaOrderByCreatedAtDesc(User warga);
}