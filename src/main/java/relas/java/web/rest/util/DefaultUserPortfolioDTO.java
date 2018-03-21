package relas.java.util;

import org.springframework.stereotype.Component;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;


@Component
public class DefaultImage {

    private byte[] image;

    public DefaultImage() {
        try{

            BufferedImage originalImage =
                ImageIO.read(new File("./src/resources/img/defaultimg.png"));

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write( originalImage, "png", baos );
            baos.flush();
            this.image = baos.toByteArray();
            baos.close();

        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public byte[] getDefaultImage() {
        return this.image;
    }



}
