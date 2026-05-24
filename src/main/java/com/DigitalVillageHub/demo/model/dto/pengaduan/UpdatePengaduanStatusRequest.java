package com.DigitalVillageHub.demo.model.dto.pengaduan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdatePengaduanStatusRequest {
    private String status;

    @JsonProperty("alasan_ditolak")
    private String alasanDitolak;
}
