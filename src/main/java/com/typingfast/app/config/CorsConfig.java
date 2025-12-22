package com.typingfast.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Allow these origins (add your frontend URLs)
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173", // Vite dev server
                "http://localhost:3000", // Alternative dev port
                "http://127.0.0.1:5173",
                "https://typingfast.up.railway.app", // Railway backend (same origin)
                "*" // Allow all for now - restrict in production
        ));

        // Allow these HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Allow these headers
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With"));

        // Expose Authorization header to frontend
        configuration.setExposedHeaders(List.of("Authorization"));

        // Allow credentials (cookies, auth headers)
        configuration.setAllowCredentials(false); // Set to false when using "*" for origins

        // Cache preflight response for 1 hour
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
