package com.DigitalVillageHub.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    public enum Role {
        WARGA, ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nik;

    @JsonProperty("no_kk")
    @Column(name = "no_kk", length = 16)
    private String noKk;

    @JsonProperty("nama_lengkap")
    @Column(name = "nama_lengkap", nullable = false)
    private String namaLengkap;

    @Column(unique = true, nullable = false)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @JsonProperty("no_hp")
    @Column(name = "no_hp", nullable = false)
    private String noHp;

    @Column(length = 255)
    private String alamat;

    @Column(length = 5)
    private String rt;

    @Column(length = 5)
    private String rw;

    @JsonProperty("status_akun")
    @Column(name = "status_akun", length = 30)
    private String statusAkun;

    @JsonProperty("status_hubungan")
    @Column(name = "status_hubungan", length = 30)
    private String statusHubungan;

    @JsonProperty("status_tinggal")
    @Column(name = "status_tinggal", length = 20)
    private String statusTinggal;

    @JsonProperty("foto_ktp")
    @Column(name = "foto_ktp")
    private String fotoKtp;

    @JsonProperty("alasan_ditolak")
    @Column(name = "alasan_ditolak", columnDefinition = "TEXT")
    private String alasanDitolak;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @JsonProperty("created_at")
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "wilayahId")
    private Wilayah wilayah;

    @ManyToOne
    @JoinColumn(name = "no_kk", referencedColumnName = "no_kk", insertable = false, updatable = false)
    private Keluarga keluarga;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (role == null) role = Role.WARGA;
        if (statusAkun == null) statusAkun = "INCOMPLETE";
    }
}