package com.DigitalVillageHub.demo.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pengaduan_petugas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PengaduanPetugas extends BaseEntity {

    @EmbeddedId
    private PengaduanPetugasId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("pengaduanId")
    @JoinColumn(name = "pengaduan_id")
    @JsonIgnore
    private Pengaduan pengaduan;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("petugasId")
    @JoinColumn(name = "petugas_id")
    private User petugas;

    @JsonProperty("assigned_at")
    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssignmentStatus status;

    @Column(columnDefinition = "TEXT")
    private String catatan;

    @PrePersist
    public void prePersistAssignment() {
        if (assignedAt == null) assignedAt = LocalDateTime.now();
        if (status == null) status = AssignmentStatus.DITUGASKAN;
    }
}
