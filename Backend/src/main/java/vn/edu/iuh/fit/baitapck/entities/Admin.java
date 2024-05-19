package vn.edu.iuh.fit.baitapck.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "admin")
@Getter @Setter @NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long AdminNumber;

    @Column(nullable = false, unique = true)
    private String adminCode;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private String gender;

    // Constructors, getters, and setters


    public Admin(Long adminNumber, String adminCode, String name, String email, String phone, String address, Date dob, String gender) {
        AdminNumber = adminNumber;
        this.adminCode = adminCode;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
    }
}
