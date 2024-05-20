package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.entities.Teacher;

import java.util.List;

public interface TeacherService {
    List<Teacher> findByDepartmentDepartmentId(Long departmentId);
}
