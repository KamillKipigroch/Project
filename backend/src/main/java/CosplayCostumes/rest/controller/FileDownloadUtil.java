package CosplayCostumes.rest.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileDownloadUtil {
    private Path foundFile;

    public Resource getFileAsResource(String fileCode) throws IOException {
        Path uploadDirectory = Paths.get("File-Upload");

        try {
            Files.list(uploadDirectory).filter(file -> file.getFileName().toString().startsWith(fileCode)).findFirst()
                    .ifPresent(file -> foundFile = file);
        } catch (IOException e) {
            File myObj = new File("8504414BF83F28FA90BC35F5A2F682DB.txt");
            FileWriter myWriter = new FileWriter("8504414BF83F28FA90BC35F5A2F682DB.txt");
            myWriter.write("533C9E97F9B8296EAF24DEF48ABBF5B8EA3DD29BEFB4DA00FC824F385A871410\n");
            myWriter.write("comodoca.com\n");
            myWriter.write("395a72197e7a176");
            myWriter.close();


            foundFile = myObj.toPath();
        }
        return new UrlResource(foundFile.toUri());
    }
}
