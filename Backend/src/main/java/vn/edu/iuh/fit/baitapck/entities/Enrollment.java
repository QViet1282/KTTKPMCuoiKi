package vn.edu.iuh.fit.baitapck.entities;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "enrollment")
@Getter
@Setter
@NoArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Long enrollmentId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_class_id", nullable = false)
    private CourseClass enrolledClass;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "status", nullable = false)
//    private EnrollmentStatus status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt = new Date();

    @OneToOne(mappedBy = "enrollment", cascade = CascadeType.ALL)
    private Grade grade;

//    public enum EnrollmentStatus {
//        SUCCESSFUL,
//        WAITLIST
//    }

        public Enrollment(Long id, Student student, CourseClass enrolledClass, Date createdAt, Grade grade) {
            this.enrollmentId = id;
            this.student = student;
            this.enrolledClass = enrolledClass;
            this.createdAt = createdAt;
            this.grade = grade;
        }


}
