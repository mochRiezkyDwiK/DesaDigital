package com.DigitalVillageHub.demo.model.dto.pengaduan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PetugasRingkasResponse {
    private Long id;

    @JsonProperty("nama_lengkap")
    private String namaLengkap;

    private String username;
    private String role;

    @JsonProperty("assignment_status")
    private String assignmentStatus;

    private String catatan;
}
