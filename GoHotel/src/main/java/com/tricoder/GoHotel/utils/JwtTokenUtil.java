package com.tricoder.GoHotel.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtTokenUtil {

    // token expiration time : 7 day (milliseconds)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

    private final SecretKey Key;

    public JwtTokenUtil(@Value("${jwt.secret}") String secreteString) {
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.Key = new SecretKeySpec(keyBytes, "HmacSHA256");

    }

    //generate JWT token for user
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    //get username from token
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    //get any claim from token
    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
        Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    //get all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(Key) // Xác minh chữ ký
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    //check token is valid
    public boolean isValidToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    //check token is expired
    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
