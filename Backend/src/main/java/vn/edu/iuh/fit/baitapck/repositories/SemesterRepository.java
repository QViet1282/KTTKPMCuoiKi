package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.iuh.fit.baitapck.entities.Semester;

public interface SemesterRepository extends JpaRepository<Semester, Long> {
    @Query(value = "SELECT s.* FROM semester s " +
            "JOIN semester_course sc ON s.semester_id = sc.semester_id " +
            "JOIN class c ON sc.semester_course_id = c.semester_course_id " +
            "WHERE c.course_class_id = :courseClassId", nativeQuery = true)
    Semester findByCourseClassId(@Param("courseClassId") Long courseClassId);
}