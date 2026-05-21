package com.DigitalVillageHub.demo.dto.pengaduan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class AssignPetugasRequest {
    @JsonProperty("petugas_ids")
    private List<Long> petugasIds;

    private String catatan;
}
