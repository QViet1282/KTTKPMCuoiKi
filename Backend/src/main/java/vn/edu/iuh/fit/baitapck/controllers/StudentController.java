package vn.edu.iuh.fit.baitapck.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.baitapck.dto.GenericRequestDTO;
import vn.edu.iuh.fit.baitapck.entities.Student;
import vn.edu.iuh.fit.baitapck.service.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register_course")
    public ResponseEntity<String> registerCourse(@RequestBody GenericRequestDTO genericRequestDTO) {
        String result = studentService.registerCourse(genericRequestDTO.getStudentId(), genericRequestDTO.getCourseClassId());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<Student> login(@RequestBody GenericRequestDTO genericRequestDTO) {
        Student student = studentService.login(genericRequestDTO.getStudentCode(), genericRequestDTO.getPassword());
        return ResponseEntity.ok(student);
    }
}
