package com.skill_share_platform.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class FileController {

    @Value("${upload.dir:uploads/}")
    private String uploadDir;

    @GetMapping("/files/{type}/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String type, @PathVariable String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(type).resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() && resource.isReadable()) {
                String contentType = type.equals("images") ? MediaType.IMAGE_PNG_VALUE : MediaType.APPLICATION_OCTET_STREAM_VALUE;
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + filename)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}