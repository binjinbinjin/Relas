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
    UserPortfolioDTO toDto(UserPortfolio userPortfolio);

    @Mapping(source = "userId", target = "user")
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
