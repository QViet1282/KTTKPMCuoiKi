package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.dto.CourseDTO;
import vn.edu.iuh.fit.baitapck.entities.SemesterCourse;

import java.util.List;

public interface SemesterCourseService {
    List<CourseDTO> findSelectedCoursesByMajorIdAndSemesterId(Long majorId, Long semesterId);

    SemesterCourse addCourseToSemester(Long semesterId, Long courseId);

    public List<SemesterCourse> findSemesterCoursesBySemesterIdAndSemesterId(Long majorId, Long semesterId);
}
