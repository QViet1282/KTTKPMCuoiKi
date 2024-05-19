package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.baitapck.entities.Student;
import vn.edu.iuh.fit.baitapck.entities.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
