package com.DigitalVillageHub.demo.config;

import com.DigitalVillageHub.demo.model.entity.User;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Date;

/**
 * Service untuk generate dan memvalidasi JSON Web Token (JWT).
 * Menggunakan library Nimbus JOSE+JWT yang sudah termasuk dalam
 * spring-boot-starter-oauth2-resource-server — tidak bergantung
 * pada Jackson sehingga aman untuk Spring Boot 4 (Jackson 3).
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    /**
     * SecretKey di-cache setelah startup agar tidak di-build ulang setiap request.
     * @PostConstruct dipanggil Spring sekali setelah dependency injection selesai.
     */
    private SecretKey secretKey;

    @PostConstruct
    private void init() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    /**
     * Generate JWT token saat user berhasil login.
     *
     * @param user entitas user yang login
     * @return token JWT sebagai String (format: header.payload.signature)
     */
    public String generateToken(User user) throws JOSEException {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getId()))          // sub = userId
                .claim("rid", user.getRole().name())            // rid = role (WARGA/ADMIN)
                .issueTime(new Date())
                .expirationTime(new Date(System.currentTimeMillis() + expirationMs))
                .build();

        SignedJWT signedJWT = new SignedJWT(header, claimsSet);
        signedJWT.sign(new MACSigner(secretKey));
        return signedJWT.serialize();
    }

    /**
     * Validasi token dan ekstrak userId dari claim "sub".
     * Melempar exception jika signature tidak valid atau token sudah kedaluwarsa.
     *
     * @param token JWT string dari header Authorization
     * @return userId sebagai Long
     */
    public Long validateAndExtractUserId(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(secretKey);

        if (!signedJWT.verify(verifier)) {
            throw new JOSEException("Signature JWT tidak valid");
        }

        Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
        if (expiration == null || expiration.before(new Date())) {
            throw new JOSEException("Token JWT telah kedaluwarsa");
        }

        return Long.parseLong(signedJWT.getJWTClaimsSet().getSubject());
    }

    /**
     * Ekstrak role dari claim "rid" tanpa melakukan query ke database.
     *
     * @param token JWT string
     * @return role string: "WARGA" atau "ADMIN"
     */
    public String extractRole(String token) throws ParseException {
        return SignedJWT.parse(token).getJWTClaimsSet().getStringClaim("rid");
    }
}
