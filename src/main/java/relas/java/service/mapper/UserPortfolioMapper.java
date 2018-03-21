package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.UserPortfolioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserPortfolio and its DTO UserPortfolioDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UserPortfolioMapper extends EntityMapper<UserPortfolioDTO, UserPortfolio> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "userName.id", target = "userNameId")
    @Mapping(source = "userName.login", target = "userNameLogin")
    UserPortfolioDTO toDto(UserPortfolio userPortfolio);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "userNameId", target = "userName")
    UserPortfolio toEntity(UserPortfolioDTO userPortfolioDTO);

    default UserPortfolio fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserPortfolio userPortfolio = new UserPortfolio();
        userPortfolio.setId(id);
        return userPortfolio;
    }
}
