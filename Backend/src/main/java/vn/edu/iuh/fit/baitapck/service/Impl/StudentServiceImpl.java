package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.entities.*;
import vn.edu.iuh.fit.baitapck.repositories.*;
import vn.edu.iuh.fit.baitapck.service.StudentService;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private CourseClassRepository courseClassRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SemesterRepository semesterRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private WaitlistEnrollmentRepository waitlistEnrollmentRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Override
    public String registerCourse(Long studentId, Long courseClassId) {
        AtomicReference<String> status = new AtomicReference<>("failed");

        Student student = studentRepository.findById(studentId).get();
        CourseClass courseClass = courseClassRepository.findById(courseClassId).get();

        Integer totalCredits = studentRepository.getTotalCreditsByStudentIdAndSemesterId(studentId, semesterRepository.findByCourseClassId(courseClassId).getSemesterId());
        int credits = totalCredits != null ? totalCredits.intValue() : 0;
        Course course = courseRepository.findByCourseClassId(courseClassId);
        if (credits + course.getCreditHour() > 30) {
            status.set("Khong the dang ky qua 30 tin chi");
            return status.get();
        }
        if(courseClass.getCurrentStudents()==courseClass.getMaxStudents()) {
            WaitlistEnrollment waitlistEnrollment = new WaitlistEnrollment();
            waitlistEnrollment.setStudent(student);
            waitlistEnrollment.setCourseClass(courseClass);
            waitlistEnrollment.setCreatedAt(new Date(System.currentTimeMillis()));
            waitlistEnrollmentRepository.save(waitlistEnrollment);
            status.set("Ban duoc them vao danh sach du bi");
            return status.get();
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setEnrolledClass(courseClass);
        enrollment.setCreatedAt(new Date(System.currentTimeMillis()));
        enrollmentRepository.save(enrollment);
        courseClass.setCurrentStudents(courseClass.getCurrentStudents()+1);
        courseClassRepository.save(courseClass);
        status.set("Dang ky thanh cong");
        emailService.sendEmail(student.getEmail(), "Dang ky hoc thanh cong", "Ban da dang ky hoc "+course.getCourseName()+" thanh cong");
        return status.get();
    }

    @Override
    public Student login(String studentCode, String password) {
        Student student = studentRepository.findByStudentCode(studentCode);
        if (student != null && student.getPassword().equals(password)) {
            return student;
        }
        return null;
    }
}
