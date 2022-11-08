package CosplayCostumes.rest.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;


@Service
public class CloudinaryService {
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    Cloudinary cloudinary;


    public String upload(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap()).get("public_id").toString();
    }

    public ByteArrayResource downloadImg(String publicId, int width, int height, boolean isAvatar) {
        logger.info("Requested to download the image file: " + publicId);

        String format = "jpg";
        Transformation transformation = new Transformation().width(width).height(height).crop("fill");
        if (isAvatar) {
            transformation = transformation.radius("max");
            format = "png";
        }
        String cloudUrl = cloudinary.url().secure(true).format(format)
                .transformation(transformation)
                .publicId(publicId)
                .generate();

        logger.debug("Generated URL of the image to be downloaded: " + cloudUrl);

        try {
            URL url = new URL(cloudUrl);
            InputStream inputStream = url.openStream();
            byte[] out = org.apache.commons.io.IOUtils.toByteArray(inputStream);
            ByteArrayResource resource = new ByteArrayResource(out);


            return resource;


        } catch (Exception ex) {
            logger.error("FAILED to download the file: " + publicId);
        }

        return null;
    }
}
