package relas.java.service.mapper;

import relas.java.domain.*;
import relas.java.service.dto.DatingRecordDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DatingRecord and its DTO DatingRecordDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface DatingRecordMapper extends EntityMapper<DatingRecordDTO, DatingRecord> {

    @Mapping(source = "userOne.id", target = "userOneId")
    @Mapping(source = "userOne.login", target = "userOneLogin")
    @Mapping(source = "userTwo.id", target = "userTwoId")
    @Mapping(source = "userTwo.login", target = "userTwoLogin")
    DatingRecordDTO toDto(DatingRecord datingRecord);

    @Mapping(source = "userOneId", target = "userOne")
    @Mapping(source = "userTwoId", target = "userTwo")
    DatingRecord toEntity(DatingRecordDTO datingRecordDTO);

    default DatingRecord fromId(Long id) {
        if (id == null) {
            return null;
        }
        DatingRecord datingRecord = new DatingRecord();
        datingRecord.setId(id);
        return datingRecord;
    }
}
