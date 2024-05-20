package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.dto.CourseDTO;
import vn.edu.iuh.fit.baitapck.entities.Course;
import vn.edu.iuh.fit.baitapck.entities.Student;
import vn.edu.iuh.fit.baitapck.repositories.CourseRepository;
import vn.edu.iuh.fit.baitapck.repositories.SemesterCourseRepository;
import vn.edu.iuh.fit.baitapck.repositories.StudentRepository;
import vn.edu.iuh.fit.baitapck.service.CourseService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SemesterCourseRepository semesterCourseRepository;

    @Override
    public List<CourseDTO> findAllByMajorId(Long MajorId) {
        List<Course> courses = courseRepository.findAllByMajorMajorId(MajorId);
        return courses.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<CourseDTO> findCoursesAvailableForStudentRegistration(Long studentId, Long semesterId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student != null) {
            List<Course> allCourses = semesterCourseRepository.findSelectedCoursesByMajorIdAndSemesterId(student.getMajor().getMajorId(),semesterId);
            List<Course> studentEnrollmented = courseRepository.findByEnrollments_Student_Id(studentId);
            List<Course> studentWaitListEnrollmented = courseRepository.findByWaitList_Enrollments_Student_Id(studentId);
            // Lọc các khóa học mà sinh viên đã đăng ký
            List<Course> availableCourses = allCourses.stream()
                    .filter(course -> !studentEnrollmented.contains(course)) // Loại bỏ các khóa học đã đăng ký
                    .filter(course -> !studentWaitListEnrollmented.contains(course)) // Loại bỏ các khóa học đã đăng ký vào danh sách chờ
                    .filter(course -> {
                        // Kiểm tra nếu course có môn tiên quyết
                        if (course.getPrerequisites() != null && !course.getPrerequisites().isEmpty()) {
                            for (Course prerequisite : course.getPrerequisites()) {
                                if (!studentEnrollmented.contains(prerequisite)) {
                                    return false; // Sinh viên chưa hoàn thành môn tiên quyết
                                }
                            }
                        }
                        return true; // Sinh viên đủ điều kiện đăng ký khóa học này
                    })
                    .collect(Collectors.toList());

            return availableCourses.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<CourseDTO> findCourseEnrolledByStudent(Long studentId, Long semesterId) {
        List<Course> studentEnrollmented = courseRepository.findByEnrollments_Student_Id_Semester_Id(studentId, semesterId);
        return studentEnrollmented.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseDTO> findCourseWaitListEnrolledByStudent(Long studentId) {
        List<Course> studentWaitListEnrollmented = courseRepository.findByWaitList_Enrollments_Student_Id(studentId);
        return studentWaitListEnrollmented.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
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
}
