package com.DigitalVillageHub.demo.service.interfaces;

import com.DigitalVillageHub.demo.model.dto.pengaduan.*;

import java.util.List;

public interface PengaduanService {
    PengaduanResponse createPengaduan(CreatePengaduanRequest request);
    List<PengaduanResponse> getAllPengaduan();
    PengaduanResponse getPengaduanById(Long id);
    List<PengaduanResponse> getPengaduanByWarga(Long wargaId);
    List<PengaduanResponse> getPengaduanByPetugas(Long petugasId);
    PengaduanResponse assignPetugas(Long pengaduanId, AssignPetugasRequest request);
    PengaduanResponse updateStatus(Long pengaduanId, UpdatePengaduanStatusRequest request);
    void deletePengaduan(Long id);
}
