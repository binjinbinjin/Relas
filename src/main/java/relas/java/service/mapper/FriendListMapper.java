package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.FriendListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FriendList and its DTO FriendListDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface FriendListMapper extends EntityMapper<FriendListDTO, FriendList> {

    @Mapping(source = "userID.id", target = "userIDId")
    @Mapping(source = "userID.login", target = "userIDLogin")
    @Mapping(source = "friendID.id", target = "friendIDId")
    @Mapping(source = "friendID.login", target = "friendIDLogin")
    FriendListDTO toDto(FriendList friendList);

    @Mapping(source = "userIDId", target = "userID")
    @Mapping(source = "friendIDId", target = "friendID")
    FriendList toEntity(FriendListDTO friendListDTO);

    default FriendList fromId(Long id) {
        if (id == null) {
            return null;
        }
        FriendList friendList = new FriendList();
        friendList.setId(id);
        return friendList;
    }
}
