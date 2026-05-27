package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.dto.PengaduanPetugasResponseDTO;
import com.DigitalVillageHub.demo.model.dto.AssignPengaduanRequestDTO;
import com.DigitalVillageHub.demo.service.PengaduanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/pengaduan")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminPengaduanController {

    private static final String SUCCESS = "success";
    private static final String MESSAGE = "message";
    private static final String DATA = "data";

    private final PengaduanService pengaduanService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPengaduan() {
        try {
            return ResponseEntity.ok(Map.of(
                    SUCCESS, true,
                    DATA, pengaduanService.getAllPengaduan()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    SUCCESS, false,
                    MESSAGE, e.getMessage()
            ));
        }
    }

    @PostMapping("/{id}/assign")
        public ResponseEntity<Map<String, Object>> assignPengaduan(
            @PathVariable Long id,
            @RequestBody AssignPengaduanRequestDTO request,
            Authentication authentication
    ) {
        try {
            Long petugasId = resolvePetugasId(authentication, request.getPetugasId());
            PengaduanPetugasResponseDTO data = pengaduanService.assignPetugas(id, petugasId, request.getCatatan());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    SUCCESS, true,
                    MESSAGE, "Pengaduan berhasil ditugaskan",
                    DATA, data
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    SUCCESS, false,
                    MESSAGE, e.getMessage()
            ));
        }
    }

    private Long resolvePetugasId(Authentication authentication, Long requestPetugasId) {
        if (requestPetugasId != null) {
            return requestPetugasId;
        }

        Authentication currentAuth = authentication != null ? authentication : SecurityContextHolder.getContext().getAuthentication();
        if (currentAuth == null || !currentAuth.isAuthenticated()) {
            throw new IllegalArgumentException("Petugas login tidak ditemukan di SecurityContextHolder");
        }

        String principal = currentAuth.getName();
        if (principal == null || principal.isBlank()) {
            throw new IllegalArgumentException("Identitas petugas login kosong");
        }

        if (principal.matches("\\d+")) {
            return Long.parseLong(principal);
        }

        throw new IllegalArgumentException("Petugas login harus memiliki identifier numerik yang bisa dipetakan ke user_id");
    }
}