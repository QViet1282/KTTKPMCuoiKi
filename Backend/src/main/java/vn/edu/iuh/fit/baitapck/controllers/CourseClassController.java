package vn.edu.iuh.fit.baitapck.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.baitapck.entities.CourseClass;
import vn.edu.iuh.fit.baitapck.service.CourseClassService;

import java.util.List;

@RestController
@RequestMapping("/course-class")
public class CourseClassController {
    private final CourseClassService courseClassService;

    public CourseClassController(CourseClassService courseClassService) {
        this.courseClassService = courseClassService;
    }

    @PostMapping ("/add")
    public ResponseEntity<CourseClass> addCourseClass(@RequestBody CourseClass courseClass) {
        CourseClass temp = courseClassService.addCourseClass(courseClass);
        return temp != null ? ResponseEntity.ok(temp) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/find-by-semester-course-id")
    public ResponseEntity<List<CourseClass>> findCourseClassBySemesterCourseId(@RequestParam("semesterCourseId") Long id) {
        List<CourseClass> courseClass = courseClassService.findCourseClassBySemesterCourseId(id);
        return courseClass != null ? ResponseEntity.ok(courseClass) : ResponseEntity.notFound().build();
    }

}
