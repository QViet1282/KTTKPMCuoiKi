package vn.edu.iuh.fit.baitapck.entities;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Table(name = "grade")
@Getter
@Setter
@NoArgsConstructor
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long GradeId;

    @OneToOne
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @Column(name = "score")
    private Double score;

    @Column(name = "passed")
    private boolean passed;

    public Grade(Long id, Enrollment enrollment, Double score, boolean passed) {
        this.GradeId = id;
        this.enrollment = enrollment;
        this.score = score;
        this.passed = passed;
    }
}
