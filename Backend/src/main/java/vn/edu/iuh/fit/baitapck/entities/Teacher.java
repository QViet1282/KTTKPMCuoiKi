package vn.edu.iuh.fit.baitapck.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "teacher")
@Getter
@Setter
@NoArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Long teacherId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String teacherCode;

    @Column(nullable = false)
    private String password;

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

    @JsonIgnore
    @ManyToOne
    private Department department;

    public Teacher(Long teacherId, String name, String teacherCode, String password, String email, String phone, String address, Date dob, String gender, Department department) {
        this.teacherId = teacherId;
        this.name = name;
        this.teacherCode = teacherCode;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
        this.department = department;
    }
}
