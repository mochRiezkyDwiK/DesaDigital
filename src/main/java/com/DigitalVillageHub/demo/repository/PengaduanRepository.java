package com.DigitalVillageHub.demo.repository;

import com.DigitalVillageHub.demo.entity.Pengaduan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PengaduanRepository extends JpaRepository<Pengaduan, Long> {
    Optional<Pengaduan> findByKodePengaduan(String kodePengaduan);
    List<Pengaduan> findByWargaIdOrderByCreatedAtDesc(Long wargaId);
    List<Pengaduan> findByStatusOrderByCreatedAtDesc(String status);
    List<Pengaduan> findAllByOrderByCreatedAtDesc();
}
