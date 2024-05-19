package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.entities.Admin;

public interface AdminService {
    Admin login(String adminCode, String password);
}
