package com.DigitalVillageHub.demo.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class LayananMasyarakat extends BaseEntity {

    @Column(nullable = false)
    private String judul;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String deskripsi;

    @Column(nullable = false)
    private String status;

    public abstract String getJenisLayanan();
}
