package com.DigitalVillageHub.demo.service;

import com.DigitalVillageHub.demo.model.dto.AuthResponse;
import com.DigitalVillageHub.demo.model.dto.LoginRequest;
import com.DigitalVillageHub.demo.model.dto.RegisterRequest;
import com.DigitalVillageHub.demo.model.entity.User;
import com.DigitalVillageHub.demo.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {

        if (request.getNik() == null || request.getNik().isBlank()) {
            throw new RuntimeException("NIK wajib diisi");
        }

        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new RuntimeException("Username wajib diisi");
        }

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new RuntimeException("Password wajib diisi");
        }

        if (userRepository.existsByNik(request.getNik())) {
            throw new RuntimeException("NIK sudah digunakan");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username sudah digunakan");
        }

        User user = User.builder()
                .nik(request.getNik())
                .namaLengkap(request.getNamaLengkap())
                .username(request.getUsername())
                .password(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()))
                .noHp(request.getNoHp())
                .role(User.Role.WARGA)
                .statusAkun("INCOMPLETE")
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("Akun warga berhasil didaftarkan! Silakan login untuk melengkapi data.")
                .data(Map.of(
                        "id", user.getId(),
                        "nik", user.getNik(),
                        "nama_lengkap", user.getNamaLengkap()
                ))
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findFirstByNikOrUsername(
                        request.getUsername(),
                        request.getUsername()
                )
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        boolean isPasswordValid = BCrypt.checkpw(request.getPassword(), user.getPassword());

        if (!isPasswordValid) {
            throw new RuntimeException("Password salah");
        }

        return AuthResponse.builder()
                .success(true)
                .message("Login Berhasil!")
                .token("DEV-TOKEN-" + user.getId())
                .user(Map.of(
                        "id", user.getId(),
                        "nik", user.getNik(),
                        "nama_lengkap", user.getNamaLengkap(),
                        "username", user.getUsername(),
                        "role", user.getRole().name(),
                        "status_akun", user.getStatusAkun()
                ))
                .build();
    }
}