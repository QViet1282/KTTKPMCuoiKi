package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.entities.Student;

public interface StudentService {
    String registerCourse(Long studentId, Long courseClassId);

    Student login(String studentCode, String password);
}
