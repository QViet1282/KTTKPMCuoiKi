package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.iuh.fit.baitapck.entities.Course;
import vn.edu.iuh.fit.baitapck.entities.SemesterCourse;

import java.util.List;

public interface SemesterCourseRepository extends JpaRepository<SemesterCourse, Long> {
    @Query("SELECT sc.course FROM SemesterCourse sc WHERE sc.course.major.majorId = :majorId AND sc.semester.semesterId = :semesterId")
    List<Course> findSelectedCoursesByMajorIdAndSemesterId(@Param("majorId") Long majorId, @Param("semesterId") Long semesterId);
}