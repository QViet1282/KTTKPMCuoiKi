package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.baitapck.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByAdminCode(String adminCode);
}