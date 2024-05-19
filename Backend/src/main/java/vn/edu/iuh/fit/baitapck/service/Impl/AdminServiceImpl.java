package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.entities.Admin;
import vn.edu.iuh.fit.baitapck.repositories.AdminRepository;
import vn.edu.iuh.fit.baitapck.service.AdminService;
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;


    @Override
    public Admin login(String adminCode, String password) {
        Admin admin = adminRepository.findByAdminCode(adminCode);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        }
        return null;
    }
}
