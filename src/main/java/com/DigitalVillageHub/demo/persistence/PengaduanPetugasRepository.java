package com.DigitalVillageHub.demo.persistence;

import com.DigitalVillageHub.demo.model.entity.PengaduanPetugas;
import com.DigitalVillageHub.demo.model.entity.PengaduanPetugasId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PengaduanPetugasRepository extends JpaRepository<PengaduanPetugas, PengaduanPetugasId> {
    List<PengaduanPetugas> findByPengaduanId(Long pengaduanId);
    List<PengaduanPetugas> findByPetugasId(Long petugasId);
    Optional<PengaduanPetugas> findByPengaduanIdAndPetugasId(Long pengaduanId, Long petugasId);
    boolean existsByPengaduanIdAndPetugasId(Long pengaduanId, Long petugasId);
}
