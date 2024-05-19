package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.iuh.fit.baitapck.entities.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByMajorMajorId(Long majorId);

    @Query(value = "SELECT c.* " +
            "FROM course c " +
            "JOIN class cc ON c.course_id = cc.semester_course_id " +
            "JOIN enrollment e ON cc.course_class_id = e.course_class_id " +
            "JOIN student s ON e.student_id = s.student_id " +
            "WHERE s.student_id = :studentId", nativeQuery = true)
    List<Course> findByEnrollments_Student_Id(@Param("studentId") Long studentId);

    @Query(value = "SELECT c.* " +
            "FROM course c " +
            "JOIN class cc ON c.course_id = cc.semester_course_id " +
            "JOIN waitlist_enrollment e ON cc.course_class_id = e.course_class_id " +
            "JOIN student s ON e.student_id = s.student_id " +
            "WHERE s.student_id = :studentId", nativeQuery = true)
    List<Course> findByWaitList_Enrollments_Student_Id(@Param("studentId") Long studentId);

    @Query(value = "SELECT s.* FROM course s " +
            "JOIN semester_course sc ON s.course_id = sc.course_id " +
            "JOIN class c ON sc.semester_course_id = c.semester_course_id " +
            "WHERE c.course_class_id = :courseClassId", nativeQuery = true)
    Course findByCourseClassId(@Param("courseClassId") Long courseClassId);

    @Query(value = "SELECT course.* " +
            "FROM enrollment " +
            "JOIN class ON enrollment.course_class_id = class.course_class_id " +
            "JOIN semester_course ON class.semester_course_id = semester_course.semester_course_id " +
            "JOIN course ON semester_course.course_id = course.course_id " +
            "JOIN semester ON semester_course.semester_id = semester.semester_id " +
            "WHERE enrollment.student_id = :studentId " +
            "AND semester.semester_id = :semesterId", nativeQuery = true)
    List<Course> findByEnrollments_Student_Id_Semester_Id(@Param("studentId") Long studentId, @Param("semesterId") Long semesterId);



}