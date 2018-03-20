package relas.java.repository;

import relas.java.domain.DatingRecord;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the DatingRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DatingRecordRepository extends JpaRepository<DatingRecord, Long> {

    @Query("select dating_record from DatingRecord dating_record where dating_record.userOne.login = ?#{principal.username}")
    List<DatingRecord> findByUserOneIsCurrentUser();

    @Query("select dating_record from DatingRecord dating_record where dating_record.userTwo.login = ?#{principal.username}")
    List<DatingRecord> findByUserTwoIsCurrentUser();

}
