package com.DigitalVillageHub.demo.config;

import com.nimbusds.jose.JOSEException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

/**
 * Filter autentikasi berbasis JWT.
 * Menggantikan DevTokenAuthenticationFilter yang menggunakan DEV-TOKEN tidak aman.
 *
 * Cara kerja:
 * 1. Baca header "Authorization: Bearer <token>"
 * 2. Validasi tanda tangan (signature) JWT menggunakan secret key
 * 3. Ekstrak userId dan role dari payload JWT — tanpa query database
 * 4. Set Authentication di SecurityContextHolder agar Spring Security tahu siapa yang login
 *
 * Jika token tidak ada / tidak valid, filter melanjutkan chain tanpa set authentication.
 * Endpoint yang butuh autentikasi akan diblokir oleh aturan di SecurityConfig.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Jika tidak ada header atau bukan Bearer token, lanjutkan tanpa autentikasi
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7); // Hapus prefix "Bearer "

        try {
            Long userId = jwtService.validateAndExtractUserId(token);
            String role = jwtService.extractRole(token);

            // Prefix "ROLE_" wajib digunakan oleh Spring Security untuk .hasRole()
            String springRole = "ROLE_" + role; // ROLE_WARGA atau ROLE_ADMIN

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            String.valueOf(userId),  // principal = userId sebagai String
                            null,                    // tidak ada credentials
                            List.of(new SimpleGrantedAuthority(springRole))
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (ParseException | JOSEException e) {
            // Token malformed, signature invalid, atau expired
            // Tidak set authentication → SecurityConfig yang akan memblokir akses
            // Log diabaikan agar tidak membanjiri log dengan percobaan token palsu
        }

        filterChain.doFilter(request, response);
    }
}
