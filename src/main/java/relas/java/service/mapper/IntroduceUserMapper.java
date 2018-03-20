package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.IntroduceUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity IntroduceUser and its DTO IntroduceUserDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface IntroduceUserMapper extends EntityMapper<IntroduceUserDTO, IntroduceUser> {

    @Mapping(source = "introduceBy.id", target = "introduceById")
    @Mapping(source = "introduceBy.login", target = "introduceByLogin")
    @Mapping(source = "introduceTo.id", target = "introduceToId")
    @Mapping(source = "introduceTo.login", target = "introduceToLogin")
    @Mapping(source = "introduceUserID.id", target = "introduceUserIDId")
    @Mapping(source = "introduceUserID.login", target = "introduceUserIDLogin")
    IntroduceUserDTO toDto(IntroduceUser introduceUser);

    @Mapping(source = "introduceById", target = "introduceBy")
    @Mapping(source = "introduceToId", target = "introduceTo")
    @Mapping(source = "introduceUserIDId", target = "introduceUserID")
    IntroduceUser toEntity(IntroduceUserDTO introduceUserDTO);

    default IntroduceUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        IntroduceUser introduceUser = new IntroduceUser();
        introduceUser.setId(id);
        return introduceUser;
    }
}
