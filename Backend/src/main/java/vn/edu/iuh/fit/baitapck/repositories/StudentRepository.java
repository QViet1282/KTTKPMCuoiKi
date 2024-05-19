package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.baitapck.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query(value = "SELECT SUM(course.credit_hour) " +
            "FROM enrollment " +
            "JOIN class ON enrollment.course_class_id = class.course_class_id " +
            "JOIN semester_course ON class.semester_course_id = semester_course.semester_course_id " +
            "JOIN course ON semester_course.course_id = course.course_id " +
            "JOIN semester ON semester_course.semester_id = semester.semester_id " +
            "WHERE enrollment.student_id = :studentId " +
            "AND semester.semester_id = :semesterId", nativeQuery = true)
    Integer getTotalCreditsByStudentIdAndSemesterId(Long studentId, Long semesterId);

    Student findByStudentCode(String studentCode);
}