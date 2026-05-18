package com.DigitalVillageHub.demo.service;

import com.DigitalVillageHub.demo.entity.Surat;
import com.DigitalVillageHub.demo.entity.User;
import com.DigitalVillageHub.demo.repository.SuratRepository;
import com.DigitalVillageHub.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SuratService {

    private final SuratRepository suratRepository;
    private final UserRepository userRepository;

    public List<Surat> getAllSurat() {
        return suratRepository.findAll();
    }

    public Surat getSuratById(Long id) {
        return suratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Surat tidak ditemukan"));
    }

    public List<Surat> getSuratByUserId(Long userId) {
        return suratRepository.findByUserId(userId);
    }

    public Surat createSurat(Long userId, Surat surat) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        surat.setUser(user);
        surat.setStatus(Surat.StatusSurat.PENDING);
        surat.setTglDiajukan(LocalDateTime.now());

        return suratRepository.save(surat);
    }

    public Surat updateStatus(Long id, Surat.StatusSurat status, String alasanDitolak) {
        Surat surat = getSuratById(id);

        surat.setStatus(status);

        if (status == Surat.StatusSurat.REJECTED) {
            surat.setAlasanDitolak(alasanDitolak);
        }

        if (status == Surat.StatusSurat.SELESAI || status == Surat.StatusSurat.PROSES) {
            surat.setTglDisetujui(LocalDateTime.now());
        }

        return suratRepository.save(surat);
    }

    public void deleteSurat(Long id) {
        Surat surat = getSuratById(id);
        suratRepository.delete(surat);
    }
}