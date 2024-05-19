package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.baitapck.entities.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}