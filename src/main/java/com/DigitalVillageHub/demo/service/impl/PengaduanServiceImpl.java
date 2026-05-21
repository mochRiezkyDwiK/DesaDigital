package com.DigitalVillageHub.demo.service.impl;

import com.DigitalVillageHub.demo.dto.pengaduan.*;
import com.DigitalVillageHub.demo.entity.*;
import com.DigitalVillageHub.demo.exception.BadRequestException;
import com.DigitalVillageHub.demo.exception.ResourceNotFoundException;
import com.DigitalVillageHub.demo.repository.PengaduanPetugasRepository;
import com.DigitalVillageHub.demo.repository.PengaduanRepository;
import com.DigitalVillageHub.demo.repository.UserRepository;
import com.DigitalVillageHub.demo.service.interfaces.PengaduanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Transactional
public class PengaduanServiceImpl implements PengaduanService {

    private final PengaduanRepository pengaduanRepository;
    private final PengaduanPetugasRepository pengaduanPetugasRepository;
    private final UserRepository userRepository;

    @Override
    public PengaduanResponse createPengaduan(CreatePengaduanRequest request) {
        if (request.getWargaId() == null) throw new BadRequestException("Warga wajib diisi");
        if (isBlank(request.getJudul())) throw new BadRequestException("Judul pengaduan wajib diisi");
        if (isBlank(request.getDeskripsi())) throw new BadRequestException("Deskripsi pengaduan wajib diisi");
        if (isBlank(request.getKategori())) throw new BadRequestException("Kategori pengaduan wajib diisi");
        if (isBlank(request.getLokasi())) throw new BadRequestException("Lokasi pengaduan wajib diisi");

        User warga = userRepository.findById(request.getWargaId())
                .orElseThrow(() -> new ResourceNotFoundException("Warga tidak ditemukan"));

        Pengaduan pengaduan = Pengaduan.builder()
                .kodePengaduan(generateKodePengaduan())
                .kategori(request.getKategori())
                .lokasi(request.getLokasi())
                .prioritas(parsePrioritas(request.getPrioritas()))
                .fotoBukti(request.getFotoBukti())
                .warga(warga)
                .build();

        pengaduan.setJudul(request.getJudul());
        pengaduan.setDeskripsi(request.getDeskripsi());
        pengaduan.setStatus(PengaduanStatus.DIAJUKAN.name());

        return toResponse(pengaduanRepository.save(pengaduan));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PengaduanResponse> getAllPengaduan() {
        return pengaduanRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PengaduanResponse getPengaduanById(Long id) {
        return toResponse(findPengaduan(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PengaduanResponse> getPengaduanByWarga(Long wargaId) {
        return pengaduanRepository.findByWargaIdOrderByCreatedAtDesc(wargaId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PengaduanResponse> getPengaduanByPetugas(Long petugasId) {
        return pengaduanPetugasRepository.findByPetugasId(petugasId)
                .stream()
                .map(PengaduanPetugas::getPengaduan)
                .map(this::toResponse)
                .toList();
    }

    @Override
    public PengaduanResponse assignPetugas(Long pengaduanId, AssignPetugasRequest request) {
        Pengaduan pengaduan = findPengaduan(pengaduanId);

        if (request.getPetugasIds() == null || request.getPetugasIds().isEmpty()) {
            throw new BadRequestException("Minimal 1 petugas wajib dipilih");
        }

        for (Long petugasId : request.getPetugasIds()) {
            User petugas = userRepository.findById(petugasId)
                    .orElseThrow(() -> new ResourceNotFoundException("Petugas dengan ID " + petugasId + " tidak ditemukan"));

            if (petugas.getRole() != User.Role.ADMIN) {
                throw new BadRequestException("User " + petugas.getNamaLengkap() + " bukan ADMIN/PETUGAS");
            }

            boolean alreadyAssigned = pengaduanPetugasRepository.existsByPengaduanIdAndPetugasId(pengaduanId, petugasId);
            if (!alreadyAssigned) {
                PengaduanPetugas assignment = PengaduanPetugas.builder()
                        .id(new PengaduanPetugasId(pengaduanId, petugasId))
                        .pengaduan(pengaduan)
                        .petugas(petugas)
                        .assignedAt(LocalDateTime.now())
                        .status(AssignmentStatus.DITUGASKAN)
                        .catatan(request.getCatatan())
                        .build();

                pengaduanPetugasRepository.save(assignment);
            }
        }

        if (PengaduanStatus.DIAJUKAN.name().equals(pengaduan.getStatus())) {
            pengaduan.setStatus(PengaduanStatus.DIPROSES.name());
            pengaduan.setTanggalDiproses(LocalDateTime.now());
            pengaduanRepository.save(pengaduan);
        }

        return toResponse(findPengaduan(pengaduanId));
    }

    @Override
    public PengaduanResponse updateStatus(Long pengaduanId, UpdatePengaduanStatusRequest request) {
        Pengaduan pengaduan = findPengaduan(pengaduanId);

        PengaduanStatus status = parseStatus(request.getStatus());
        pengaduan.setStatus(status.name());

        if (status == PengaduanStatus.DIPROSES) {
            pengaduan.setTanggalDiproses(LocalDateTime.now());
        }

        if (status == PengaduanStatus.SELESAI) {
            pengaduan.setTanggalSelesai(LocalDateTime.now());
        }

        if (status == PengaduanStatus.DITOLAK) {
            pengaduan.setAlasanDitolak(request.getAlasanDitolak());
        } else {
            pengaduan.setAlasanDitolak(null);
        }

        return toResponse(pengaduanRepository.save(pengaduan));
    }

    @Override
    public void deletePengaduan(Long id) {
        pengaduanRepository.delete(findPengaduan(id));
    }

    private Pengaduan findPengaduan(Long id) {
        return pengaduanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pengaduan tidak ditemukan"));
    }

    private PengaduanResponse toResponse(Pengaduan pengaduan) {
        List<PetugasRingkasResponse> petugas = pengaduanPetugasRepository.findByPengaduanId(pengaduan.getId())
                .stream()
                .map(item -> PetugasRingkasResponse.builder()
                        .id(item.getPetugas().getId())
                        .namaLengkap(item.getPetugas().getNamaLengkap())
                        .username(item.getPetugas().getUsername())
                        .role(item.getPetugas().getRole().name())
                        .assignmentStatus(item.getStatus().name())
                        .catatan(item.getCatatan())
                        .build())
                .toList();

        return PengaduanResponse.builder()
                .id(pengaduan.getId())
                .kodePengaduan(pengaduan.getKodePengaduan())
                .judul(pengaduan.getJudul())
                .deskripsi(pengaduan.getDeskripsi())
                .kategori(pengaduan.getKategori())
                .lokasi(pengaduan.getLokasi())
                .prioritas(pengaduan.getPrioritas().name())
                .status(pengaduan.getStatus())
                .wargaId(pengaduan.getWarga().getId())
                .namaWarga(pengaduan.getWarga().getNamaLengkap())
                .petugas(petugas)
                .createdAt(pengaduan.getCreatedAt())
                .updatedAt(pengaduan.getUpdatedAt())
                .build();
    }

    private String generateKodePengaduan() {
        return "PGD-" + LocalDateTime.now().getYear() + "-" + System.currentTimeMillis();
    }

    private PrioritasPengaduan parsePrioritas(String value) {
        if (isBlank(value)) return PrioritasPengaduan.SEDANG;
        try {
            return PrioritasPengaduan.valueOf(value.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Prioritas tidak valid. Gunakan RENDAH, SEDANG, TINGGI, atau DARURAT");
        }
    }

    private PengaduanStatus parseStatus(String value) {
        if (isBlank(value)) throw new BadRequestException("Status wajib diisi");
        try {
            return PengaduanStatus.valueOf(value.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Status tidak valid. Gunakan DIAJUKAN, DIPROSES, SELESAI, atau DITOLAK");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
