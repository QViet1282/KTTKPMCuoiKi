package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.dto.CourseDTO;
import vn.edu.iuh.fit.baitapck.entities.Course;
import vn.edu.iuh.fit.baitapck.entities.Major;

import java.util.List;

public interface CourseService {
    List<CourseDTO> findAllByMajorId(Long MajorId);

    List<CourseDTO> findCoursesAvailableForStudentRegistration(Long studentId);
    List<CourseDTO> findCourseEnrolledByStudent(Long studentId, Long semesterId);
    List<CourseDTO> findCourseWaitListEnrolledByStudent(Long studentId);
}
