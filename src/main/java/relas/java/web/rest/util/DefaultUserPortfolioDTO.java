package relas.java.web.rest.util;

import org.springframework.stereotype.Component;
import relas.java.domain.UserPortfolio;
import relas.java.service.dto.UserPortfolioDTO;
import relas.java.web.rest.errors.NullParamaterException;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;



public class DefaultUserPortfolioDTO {

    private static byte[] image;

    private DefaultUserPortfolioDTO() {
    }

    private static void newImg() {
        try{
            BufferedImage originalImage =
                ImageIO.read(new File("./src/main/resources/img/defaultimg.png"));

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write( originalImage, "png", baos );
            baos.flush();
            DefaultUserPortfolioDTO.image = baos.toByteArray();
            baos.close();

        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public static UserPortfolioDTO getUserPortfolioDTO(long userId, String userNameLogin) {
        if (DefaultUserPortfolioDTO.image == null) {
            DefaultUserPortfolioDTO.newImg();
        }

        if (userNameLogin == null)
            throw new NullParamaterException(DefaultUserPortfolioDTO.class, userNameLogin);

        UserPortfolioDTO dto = new UserPortfolioDTO();

        dto.setImage(DefaultUserPortfolioDTO.image);
        dto.setImageContentType("image/png");
        dto.setUserId(userId);
        dto.setUserNameId(userId);
        dto.setUserNameLogin(userNameLogin);
        return dto;
    }



}
