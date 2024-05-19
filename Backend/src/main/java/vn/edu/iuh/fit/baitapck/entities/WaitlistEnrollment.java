package vn.edu.iuh.fit.baitapck.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "waitlist_enrollment")
@Getter
@Setter
@NoArgsConstructor
public class WaitlistEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "waitlist_id")
    private Long waitListId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_class_id", nullable = false)
    private CourseClass courseClass;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    // Constructors
    public WaitlistEnrollment(Long waitlistId, Student student, CourseClass courseClass, Date createdAt) {
        this.waitListId = waitlistId;
        this.student = student;
        this.courseClass = courseClass;
        this.createdAt = createdAt;
    }
}
