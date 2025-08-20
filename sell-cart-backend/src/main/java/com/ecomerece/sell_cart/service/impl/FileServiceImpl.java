package com.ecomerece.sell_cart.service.impl;

import com.ecomerece.sell_cart.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        // File name of current / original file
        String originalFileName = file.getOriginalFilename();

        // Generate a unique file name
        String randomId = UUID.randomUUID().toString();

        // create a new file name -> box.jpg --> 1421.jpg
        assert originalFileName != null;
        String fileName = randomId.concat(
                originalFileName.substring(originalFileName.lastIndexOf('.')));
        String filePath = path + File.separator + fileName;

        // check if path exist and create
        File folder = new File(path);

        if(!folder.exists()) {
            folder.mkdir();
        }

        System.out.println(filePath);
        Files.copy(file.getInputStream(), Paths.get(filePath));

        // upload to server
        return fileName;
    }

}
