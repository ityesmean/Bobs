package com.b304.bobs.repository;

import com.b304.bobs.entity.Community;
import com.b304.bobs.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface StudyRepository extends JpaRepository<Community, Long> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE study SET study_title =:studyTitle, study_content =:studyContent, WHERE study_id =:studyId AND study_deleted =0", nativeQuery = true)
    public int modifyStudy(@Param("studyId") Long study_id, @Param("studyTitle") String study_title, @Param("studyContent") String study_content);

    @Modifying
    @Transactional(readOnly = true)
    @Query(value = "UPDATE study SET study_deleted = 1 WHERE study_id =:studyId AND study_deleted=0", nativeQuery = true)
    public int deleteStudyById(@Param("studyId") Long study_id);


    @Transactional(readOnly = true)
    @Query(value = "SELECT * FROM study WHERE study_id =:studyId AND study_deleted = 0", nativeQuery = true)
    public Study findOneById(@Param("studyId")Long study_id);

}
