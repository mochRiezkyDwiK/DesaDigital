package com.DigitalVillageHub.demo.dto.pengaduan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PengaduanResponse {
    private Long id;

    @JsonProperty("kode_pengaduan")
    private String kodePengaduan;

    private String judul;
    private String deskripsi;
    private String kategori;
    private String lokasi;
    private String prioritas;
    private String status;

    @JsonProperty("warga_id")
    private Long wargaId;

    @JsonProperty("nama_warga")
    private String namaWarga;

    private List<PetugasRingkasResponse> petugas;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}
