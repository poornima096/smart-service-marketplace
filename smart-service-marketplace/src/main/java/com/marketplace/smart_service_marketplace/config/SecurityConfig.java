package com.marketplace.smart_service_marketplace.config;

import com.marketplace.smart_service_marketplace.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

    	http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers(
                                "/api/users/register",
                                "/api/auth/login"
                        ).permitAll()

                     // Anyone can browse services
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/services",
                                "/api/services/**"
                        ).permitAll()
                        // Only PROVIDER and ADMIN can create services
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/services/**"
                        ).hasAnyRole(
                                "VENDOR",
                                "ADMIN"
                        )

                        // Only PROVIDER and ADMIN can update services
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/services/**"
                        ).hasAnyRole(
                                "VENDOR",
                                "ADMIN"
                        )
                        // Only PROVIDER and ADMIN can delete services
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/services/**"
                        ).hasAnyRole(
                                "VENDOR",
                                "ADMIN"
                        )

                        // Booking APIs
                        .requestMatchers(
                                "/api/bookings/**"
                        ).hasAnyRole(
                                "CUSTOMER",
                                "VENDOR",
                                "ADMIN"
                        )
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                          
                        
                        .requestMatchers("/api/ai/**").authenticated()
                        
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
            Arrays.asList("http://localhost:5173")
        );

        configuration.setAllowedMethods(
            Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
            Arrays.asList("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}