package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.entities.CourseClass;
import vn.edu.iuh.fit.baitapck.repositories.CourseClassRepository;
import vn.edu.iuh.fit.baitapck.repositories.SemesterCourseRepository;
import vn.edu.iuh.fit.baitapck.repositories.TeacherRepository;
import vn.edu.iuh.fit.baitapck.service.CourseClassService;

import java.util.List;

@Service
public class CourseClassServiceImpl implements CourseClassService {
    @Autowired
    private CourseClassRepository courseClassRepository;

    @Autowired
    private SemesterCourseRepository semesterCourseRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Override
    public CourseClass addCourseClass(CourseClass courseClass) {
        courseClass.setInstructor(teacherRepository.findById(courseClass.getInstructor().getTeacherId()).get());
        courseClass.setSemesterCourse(semesterCourseRepository.findById(courseClass.getSemesterCourse().getSemesterCourseId()).get());
        return courseClassRepository.save(courseClass);
    }

    @Override
    public List<CourseClass> findCourseClassBySemesterCourseId(Long id) {
        return courseClassRepository.findAllBySemesterCourseSemesterCourseId(id);
    }
}
