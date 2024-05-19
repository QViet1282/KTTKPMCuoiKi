package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.baitapck.entities.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

}