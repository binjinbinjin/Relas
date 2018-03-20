package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.TweetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tweet and its DTO TweetDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TweetMapper extends EntityMapper<TweetDTO, Tweet> {

    @Mapping(source = "userID.id", target = "userIDId")
    @Mapping(source = "userID.login", target = "userIDLogin")
    TweetDTO toDto(Tweet tweet);

    @Mapping(source = "userIDId", target = "userID")
    Tweet toEntity(TweetDTO tweetDTO);

    default Tweet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tweet tweet = new Tweet();
        tweet.setId(id);
        return tweet;
    }
}
