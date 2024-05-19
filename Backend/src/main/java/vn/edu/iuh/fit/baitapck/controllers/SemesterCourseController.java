package vn.edu.iuh.fit.baitapck.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.baitapck.dto.CourseDTO;
import vn.edu.iuh.fit.baitapck.dto.GenericRequestDTO;
import vn.edu.iuh.fit.baitapck.entities.SemesterCourse;
import vn.edu.iuh.fit.baitapck.service.SemesterCourseService;

import java.util.List;

@RestController
@RequestMapping("/semester-course")
public class SemesterCourseController {
    private final SemesterCourseService semesterCourseService;

    public SemesterCourseController(SemesterCourseService semesterCourseService) {
        this.semesterCourseService = semesterCourseService;
    }

    @GetMapping("/selected-courses")
    public ResponseEntity<List<CourseDTO>> getAllCoursesByMajorIdAndSemesterId(
            @RequestParam("majorId") Long majorId,
            @RequestParam("semesterId") Long semesterId) {
        List<CourseDTO> courses = semesterCourseService.findSelectedCoursesByMajorIdAndSemesterId(majorId, semesterId);
        return courses != null ? ResponseEntity.ok(courses) : ResponseEntity.notFound().build();
    }
    @PostMapping ("/add")
    public ResponseEntity<SemesterCourse> addCourseToSemester(@RequestBody GenericRequestDTO genericRequestDTO) {
        SemesterCourse temp = semesterCourseService.addCourseToSemester(genericRequestDTO.getSemesterId(), genericRequestDTO.getCourseId());
        return temp != null ? ResponseEntity.ok(temp) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

}
