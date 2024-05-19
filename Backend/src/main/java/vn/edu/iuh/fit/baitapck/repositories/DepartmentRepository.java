package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.baitapck.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}