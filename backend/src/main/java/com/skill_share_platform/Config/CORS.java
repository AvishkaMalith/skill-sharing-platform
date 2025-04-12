package com.skill_share_platform.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORS implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("http://localhost:5173") // Specify allowed origin(s)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials
    }
}
