package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.dto.ApiResponse;
import com.DigitalVillageHub.demo.dto.pengaduan.*;
import com.DigitalVillageHub.demo.service.interfaces.PengaduanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pengaduan")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PengaduanController {

    private final PengaduanService pengaduanService;

    @PostMapping
    public ResponseEntity<ApiResponse<PengaduanResponse>> createPengaduan(@RequestBody CreatePengaduanRequest request) {
        return ResponseEntity.status(201).body(ApiResponse.<PengaduanResponse>builder()
                .success(true)
                .message("Pengaduan berhasil dibuat")
                .data(pengaduanService.createPengaduan(request))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PengaduanResponse>>> getAllPengaduan() {
        return ResponseEntity.ok(ApiResponse.<List<PengaduanResponse>>builder()
                .success(true)
                .message("Data pengaduan berhasil diambil")
                .data(pengaduanService.getAllPengaduan())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PengaduanResponse>> getPengaduanById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.<PengaduanResponse>builder()
                .success(true)
                .message("Detail pengaduan berhasil diambil")
                .data(pengaduanService.getPengaduanById(id))
                .build());
    }

    @GetMapping("/warga/{wargaId}")
    public ResponseEntity<ApiResponse<List<PengaduanResponse>>> getByWarga(@PathVariable Long wargaId) {
        return ResponseEntity.ok(ApiResponse.<List<PengaduanResponse>>builder()
                .success(true)
                .message("Riwayat pengaduan warga berhasil diambil")
                .data(pengaduanService.getPengaduanByWarga(wargaId))
                .build());
    }

    @GetMapping("/petugas/{petugasId}")
    public ResponseEntity<ApiResponse<List<PengaduanResponse>>> getByPetugas(@PathVariable Long petugasId) {
        return ResponseEntity.ok(ApiResponse.<List<PengaduanResponse>>builder()
                .success(true)
                .message("Daftar tugas petugas berhasil diambil")
                .data(pengaduanService.getPengaduanByPetugas(petugasId))
                .build());
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<ApiResponse<PengaduanResponse>> assignPetugas(
            @PathVariable Long id,
            @RequestBody AssignPetugasRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.<PengaduanResponse>builder()
                .success(true)
                .message("Petugas berhasil ditugaskan")
                .data(pengaduanService.assignPetugas(id, request))
                .build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PengaduanResponse>> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdatePengaduanStatusRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.<PengaduanResponse>builder()
                .success(true)
                .message("Status pengaduan berhasil diperbarui")
                .data(pengaduanService.updateStatus(id, request))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deletePengaduan(@PathVariable Long id) {
        pengaduanService.deletePengaduan(id);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Pengaduan berhasil dihapus")
                .data(null)
                .build());
    }
}
