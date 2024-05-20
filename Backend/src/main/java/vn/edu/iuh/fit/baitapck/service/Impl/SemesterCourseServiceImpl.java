package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.dto.CourseDTO;
import vn.edu.iuh.fit.baitapck.entities.Course;
import vn.edu.iuh.fit.baitapck.entities.Semester;
import vn.edu.iuh.fit.baitapck.entities.SemesterCourse;
import vn.edu.iuh.fit.baitapck.repositories.CourseRepository;
import vn.edu.iuh.fit.baitapck.repositories.SemesterCourseRepository;
import vn.edu.iuh.fit.baitapck.repositories.SemesterRepository;
import vn.edu.iuh.fit.baitapck.service.SemesterCourseService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SemesterCourseServiceImpl implements SemesterCourseService {
    @Autowired
    private SemesterCourseRepository semesterCourseRepository;
    @Autowired
    private SemesterRepository semesterRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Override
    public List<CourseDTO> findSelectedCoursesByMajorIdAndSemesterId(Long majorId, Long semesterId) {
        List<Course> courses = semesterCourseRepository.findSelectedCoursesByMajorIdAndSemesterId(majorId, semesterId);
        return courses.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CourseDTO convertToDTO(Course course) {
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setCourseId(course.getCourseId());
        courseDTO.setCourseName(course.getCourseName());
        courseDTO.setCreditFee(course.getCreditFee());
        courseDTO.setCreditHour(course.getCreditHour());
        courseDTO.setOptional(course.isOptional());

        // Map the prerequisites to a list of course names
        List<String> prerequisiteNames = course.getPrerequisites().stream()
                .map(Course::getCourseName)
                .collect(Collectors.toList());

        courseDTO.setPrerequisites(prerequisiteNames);
        return courseDTO;
    }

    @Override
    public SemesterCourse addCourseToSemester(Long semesterId, Long courseId) {
        Semester semester = semesterRepository.findById(semesterId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        if (semester != null && course != null) {
            SemesterCourse semesterCourse = new SemesterCourse();
            semesterCourse.setSemester(semester);
            semesterCourse.setCourse(course);
            return semesterCourseRepository.save(semesterCourse);
        }
        return null;
    }

    @Override
    public List<SemesterCourse> findSemesterCoursesBySemesterIdAndSemesterId(Long majorId, Long semesterId) {
        return semesterCourseRepository.findSemesterCoursesByCourseIdAndSemesterId(majorId, semesterId);
    }


}
