package com.DigitalVillageHub.demo.repository;

import com.DigitalVillageHub.demo.entity.Surat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SuratRepository extends JpaRepository<Surat, Long> {

    List<Surat> findByUserId(Long userId);

    List<Surat> findByStatus(Surat.StatusSurat status);
}