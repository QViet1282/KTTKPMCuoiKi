package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.entities.CourseClass;

import java.util.List;

public interface CourseClassService {
    CourseClass addCourseClass(CourseClass courseClass);
    List<CourseClass> findCourseClassBySemesterCourseId(Long id);
}
