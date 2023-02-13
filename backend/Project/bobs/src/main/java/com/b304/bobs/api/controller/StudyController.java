package com.b304.bobs.api.controller;

import com.b304.bobs.api.request.PageReq;
import com.b304.bobs.api.request.StudyInfoReq;
import com.b304.bobs.api.request.StudyReq;
import com.b304.bobs.api.response.ModifyRes;
import com.b304.bobs.api.response.PageRes;
import com.b304.bobs.api.response.StudyRes;
import com.b304.bobs.api.service.StudyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "studies", description = "스터디 API")
@RestController
@RequiredArgsConstructor
@ResponseBody
@RequestMapping("/studies")
public class StudyController {

    private final StudyService studyService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getALl(@RequestParam(value="page") int page) {
        Map<String, Object> map = new HashMap<>();
        PageReq pageReq = new PageReq(page);
        PageRequest pageRequest = PageRequest.of(pageReq.getPage(), pageReq.pageSizeForCommunity(), Sort.by("study_created").descending());

        try {
            PageRes result = studyService.findAll(pageRequest);

            if (result.getContents() == null) {
                map.put("result", false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
            } else {
                map.put("data", result.getContents());
                map.put("total_page", result.getTotalPages());
                map.put("current_page", page+1);
                map.put("result", true);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/info")
    public ResponseEntity<?> getOne(@RequestBody StudyInfoReq studyInfoReq){
        Map<String, Object> map = new HashMap<String, Object>();

        Long user_id = studyInfoReq.getUser_id();
        Long study_id = studyInfoReq.getStudy_id();
        //방장인지. 일반 사용자인지 확인


        try {

            StudyRes result = studyService.findOneById(study_id);

            if (result.getUser_id()==null) {
                map.put("result", false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
            }
            else{
                map.put("data", result);
                map.put("result", true);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping
    private ResponseEntity<?> create(@RequestBody StudyReq studyReq){
        Map<String, Object> map = new HashMap<String, Object>();
//        if(studyReq.getUser_id() == null) {
//            map.put("result", false);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
//        }
        try {
            StudyRes result = studyService.createStudy(studyReq);
            if (result.equals(new StudyRes())) {
                map.put("result", false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
            }
            else{
                map.put("data", result);
                map.put("result", true);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PutMapping
    private ResponseEntity<?> modify(@RequestBody StudyReq studyReq){
        Map<String, Object> map = new HashMap<String, Object>();
        System.out.println(studyReq.getStudy_id());

        try {
            ModifyRes modifyRes = studyService.modifyStudy(studyReq);
            if(modifyRes.getResult()){
                map.put("study_id", modifyRes.getId());
                map.put("result", true);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }else{
                map.put("result", false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @DeleteMapping()
    private ResponseEntity<?> delete(@RequestParam(value="value") Long study_id){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            ModifyRes modifyRes = studyService.deleteStudy(study_id);
            if(modifyRes.getResult()){
                map.put("study_id", modifyRes.getId());
                map.put("result",true);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }
            else {
                map.put("result",false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

}
