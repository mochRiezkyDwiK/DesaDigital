package com.DigitalVillageHub.demo.model.dto.pengaduan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreatePengaduanRequest {
    @JsonProperty("warga_id")
    private Long wargaId;

    private String judul;
    private String deskripsi;
    private String kategori;
    private String lokasi;
    private String prioritas;

    @JsonProperty("foto_bukti")
    private String fotoBukti;
}
