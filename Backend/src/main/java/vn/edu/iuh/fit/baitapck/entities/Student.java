package vn.edu.iuh.fit.baitapck.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentNumber;

    @Column(nullable = false, unique = true)
    private String studentCode;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private String gender;

    @ManyToOne
    @JoinColumn(name = "major_id")
    private Major major;

    // Constructors, getters, and setters


    public Student(Long studentNumber, String studentCode, String name, String email, String phone, String address, Date dob, String gender, Major major) {
        this.studentNumber = studentNumber;
        this.studentCode = studentCode;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
        this.major = major;
    }
}
