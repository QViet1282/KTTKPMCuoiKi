package vn.edu.iuh.fit.baitapck.controllers;

import com.fasterxml.jackson.core.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.baitapck.entities.Department;
import vn.edu.iuh.fit.baitapck.entities.Major;
import vn.edu.iuh.fit.baitapck.service.MajorService;

import java.util.List;

@RestController
@RequestMapping("/major")
public class MajorController {
    private final MajorService majorService;


    public MajorController(MajorService majorService) {
        this.majorService = majorService;
    }


    @GetMapping("/all/departmentId")
    public ResponseEntity<List<Major>> getAllMajorsByDepartmentId(@RequestParam("departmentId") Long departmentId) {
        List<Major> majors = majorService.findAllByDepartmentId(departmentId);
        if (majors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(majors);
    }

}
