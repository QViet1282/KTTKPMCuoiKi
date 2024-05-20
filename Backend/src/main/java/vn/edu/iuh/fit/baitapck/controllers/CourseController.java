package vn.edu.iuh.fit.baitapck.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.baitapck.dto.CourseDTO;
import vn.edu.iuh.fit.baitapck.entities.Course;
import vn.edu.iuh.fit.baitapck.entities.Major;
import vn.edu.iuh.fit.baitapck.service.CourseService;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;


    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/all/majorId")
    public ResponseEntity<List<CourseDTO>> getAllCoursesByMajorId(@RequestParam("majorId") Long majorId) {
        List<CourseDTO> courses = courseService.findAllByMajorId(majorId);
        if (courses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/available-courses")
    public ResponseEntity<List<CourseDTO>> getCoursesAvailableForStudentRegistration(@RequestParam Long studentId, @RequestParam Long semesterId) {
        List<CourseDTO> availableCourses = courseService.findCoursesAvailableForStudentRegistration(studentId, semesterId);
        if (availableCourses != null) {
            return ResponseEntity.ok(availableCourses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/student/enrolled-courses")
    public ResponseEntity<List<CourseDTO>> getEnrolledCourses(@RequestParam Long studentId, @RequestParam Long semesterId) {
        List<CourseDTO> enrolledCourses = courseService.findCourseEnrolledByStudent(studentId, semesterId);
        if (enrolledCourses != null) {
            return ResponseEntity.ok(enrolledCourses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/student/wait-list-courses")
    public ResponseEntity<List<CourseDTO>> getWaitListEnrolledCourses(@RequestParam Long studentId) {
        List<CourseDTO> waitListEnrolledCourses = courseService.findCourseWaitListEnrolledByStudent(studentId);
        if (waitListEnrolledCourses != null) {
            return ResponseEntity.ok(waitListEnrolledCourses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
