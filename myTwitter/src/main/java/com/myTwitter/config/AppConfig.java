package com.myTwitter.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class AppConfig {
   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

       httpSecurity
               .sessionManagement(Session -> Session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authorizeHttpRequests(Authorize -> Authorize.requestMatchers("/api/**").authenticated()
               .anyRequest().permitAll()).addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
               .csrf(AbstractHttpConfigurer::disable)
               .cors((cors) -> cors.configurationSource(corsConfigurationSource()));
               //.httpBasic().and().formLogin();

       return httpSecurity.build();
   }


    private CorsConfigurationSource corsConfigurationSource() {

       return new CorsConfigurationSource() {
           @Override
           public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
               CorsConfiguration configuration = new CorsConfiguration();
               configuration.applyPermitDefaultValues();
               configuration.setAllowedOrigins(List.of("http://localhost:3000"));
               configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE"));
               configuration.setAllowedHeaders(List.of("*"));
               configuration.setAllowCredentials(true);
               configuration.setExposedHeaders(List.of("Authorization"));
               configuration.setMaxAge(3600L);
               return configuration;

           }
       };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
    }
}
