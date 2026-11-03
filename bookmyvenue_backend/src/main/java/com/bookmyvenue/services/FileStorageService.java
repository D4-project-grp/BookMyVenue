package com.bookmyvenue.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookmyvenue.config.UploadProperties;

@Service
public class FileStorageService {

    private final UploadProperties uploadProperties;

    public FileStorageService(UploadProperties uploadProperties) {
        this.uploadProperties = uploadProperties;
    }
    public String saveImage(MultipartFile file, String folder) throws IOException {

        Path uploadPath = Paths.get(uploadProperties.getUploadDir(), folder);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String extension = "";

        String original = file.getOriginalFilename();

        if (original != null && original.contains(".")) {
            extension = original.substring(original.lastIndexOf("."));
        }

        String filename = UUID.randomUUID() + extension;

        Files.copy(
                file.getInputStream(),
                uploadPath.resolve(filename),
                StandardCopyOption.REPLACE_EXISTING
        );

        return folder + "/" + filename;
    }

    public Resource getImage(String imagePath) throws IOException {

        Path filePath = Paths.get(uploadProperties.getUploadDir())
                .resolve(imagePath)
                .normalize();

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new IOException("Image not found: " + imagePath);
        }

        return resource;
    }
    
    public void deleteImage(String imagePath) throws IOException {
    	// finds the image path in the database
        Path filePath = Paths.get(uploadProperties.getUploadDir())
                .resolve(imagePath)
                .normalize();
        // deleting that file
        Files.deleteIfExists(filePath);
    }
}