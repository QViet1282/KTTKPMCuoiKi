package vn.edu.iuh.fit.baitapck.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "course")
@Getter
@Setter
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "credit_fee", nullable = false)
    private int creditFee;

    @Column(name = "credit_hour", nullable = false)
    private int creditHour;

    @ManyToOne
    @JoinColumn(name = "major_id", nullable = false)
    @JsonIgnore
    private Major major;

    @Column(name = "is_optional", nullable = false)
    private boolean optional;

    @ManyToMany
    @JoinTable(
            name = "course_prerequisite",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisite_course_id")
    )
    private Set<Course> prerequisites = new HashSet<>();
    // Constructor
    public Course(Long courseId, String courseName, int creditFee, int creditHour, Major major, boolean optional) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.creditFee = creditFee;
        this.creditHour = creditHour;
        this.major = major;
        this.optional = optional;
    }

}
