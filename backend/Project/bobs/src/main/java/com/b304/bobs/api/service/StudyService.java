package com.b304.bobs.api.service;

import com.b304.bobs.api.response.ModifyRes;
import com.b304.bobs.api.response.PageRes;
import com.b304.bobs.api.response.StudyRes;
import org.springframework.data.domain.Pageable;
import com.b304.bobs.api.request.StudyReq;
public interface StudyService {

     StudyRes createStudy(StudyReq studyReq) throws Exception;
     ModifyRes deleteStudy(Long study_id) throws Exception;
     ModifyRes modifyStudy(StudyReq studyReq) throws Exception;
     StudyRes findOneById(Long study_id) throws Exception;
     PageRes findAll(Pageable pageable) throws Exception;

}
