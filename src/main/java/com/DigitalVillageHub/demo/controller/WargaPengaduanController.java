package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.dto.PengaduanResponseDTO;
import com.DigitalVillageHub.demo.model.dto.AjukanPengaduanRequestDTO;
import com.DigitalVillageHub.demo.service.PengaduanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/warga/pengaduan")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class WargaPengaduanController {

    private static final String SUCCESS = "success";
    private static final String MESSAGE = "message";
    private static final String DATA = "data";

    private final PengaduanService pengaduanService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> ajukanLaporan(@RequestBody AjukanPengaduanRequestDTO request) {
        try {
            PengaduanResponseDTO data = pengaduanService.ajukanLaporan(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                        SUCCESS, true,
                        MESSAGE, "Pengaduan berhasil diajukan",
                        DATA, data
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                        SUCCESS, false,
                        MESSAGE, e.getMessage()
            ));
        }
    }

    /**
     * Mengambil riwayat pengaduan milik warga yang sedang login.
     * Authentication diisi oleh JwtAuthenticationFilter — principal = userId.
     */
    @GetMapping("/riwayat")
    public ResponseEntity<Map<String, Object>> riwayatPengaduan(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        SUCCESS, false,
                        MESSAGE, "Tidak terautentikasi. Silakan login ulang."
                ));
            }

            return ResponseEntity.ok(Map.of(
                    SUCCESS, true,
                    DATA, pengaduanService.getRiwayatWargaByPrincipal(authentication.getName())
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    SUCCESS, false,
                    MESSAGE, e.getMessage()
            ));
        }
    }
}