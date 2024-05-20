package vn.edu.iuh.fit.baitapck.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.baitapck.entities.Teacher;
import vn.edu.iuh.fit.baitapck.service.TeacherService;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }


    @GetMapping("/department/{departmentId}")
    public List<Teacher> getTeachersByDepartment(@PathVariable Long departmentId) {
        return teacherService.findByDepartmentDepartmentId(departmentId);
    }
}
