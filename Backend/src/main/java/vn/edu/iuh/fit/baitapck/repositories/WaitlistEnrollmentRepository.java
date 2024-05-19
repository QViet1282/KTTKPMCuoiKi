package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.baitapck.entities.WaitlistEnrollment;

public interface WaitlistEnrollmentRepository extends JpaRepository<WaitlistEnrollment, Long> {
}