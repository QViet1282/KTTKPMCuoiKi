package vn.edu.iuh.fit.baitapck.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.baitapck.dto.GenericRequestDTO;
import vn.edu.iuh.fit.baitapck.entities.Admin;
import vn.edu.iuh.fit.baitapck.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody GenericRequestDTO genericRequestDTO) {
        Admin admin = adminService.login(genericRequestDTO.getAdminCode(), genericRequestDTO.getPassword());
        return ResponseEntity.ok(admin);
    }
}
