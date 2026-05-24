package com.DigitalVillageHub.demo.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pengaduan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pengaduan extends LayananMasyarakat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("kode_pengaduan")
    @Column(name = "kode_pengaduan", unique = true, nullable = false)
    private String kodePengaduan;

    @Column(nullable = false)
    private String kategori;

    @Column(nullable = false)
    private String lokasi;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrioritasPengaduan prioritas;

    @JsonProperty("foto_bukti")
    @Column(name = "foto_bukti")
    private String fotoBukti;

    @JsonProperty("alasan_ditolak")
    @Column(name = "alasan_ditolak", columnDefinition = "TEXT")
    private String alasanDitolak;

    @JsonProperty("tanggal_diproses")
    @Column(name = "tanggal_diproses")
    private LocalDateTime tanggalDiproses;

    @JsonProperty("tanggal_selesai")
    @Column(name = "tanggal_selesai")
    private LocalDateTime tanggalSelesai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warga_id", nullable = false)
    @JsonIgnore
    private User warga;

    @OneToMany(mappedBy = "pengaduan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PengaduanPetugas> petugasAssignments = new ArrayList<>();

    @Override
    public String getJenisLayanan() {
        return "PENGADUAN_MASYARAKAT";
    }

    @PrePersist
    public void prePersistPengaduan() {
        if (getStatus() == null) setStatus(PengaduanStatus.DIAJUKAN.name());
        if (prioritas == null) prioritas = PrioritasPengaduan.SEDANG;
        if (kodePengaduan == null || kodePengaduan.isBlank()) {
            kodePengaduan = "PGD-" + System.currentTimeMillis();
        }
    }
}
