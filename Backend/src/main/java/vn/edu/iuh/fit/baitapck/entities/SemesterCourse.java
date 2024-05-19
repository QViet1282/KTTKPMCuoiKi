package vn.edu.iuh.fit.baitapck.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "semester_course")
@Getter
@Setter
@NoArgsConstructor
public class SemesterCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "semester_course_id")
    private Long semesterCourseId;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

//    @Column(name = "registration_start_date", nullable = false)
//    @Temporal(TemporalType.DATE)
//    private Date registrationStartDate;
//
//    @Column(name = "registration_end_date", nullable = false)
//    @Temporal(TemporalType.DATE)
//    private Date registrationEndDate;
//    // Constructor

      public SemesterCourse(Long semesterCourseId, Course course, Semester semester) {
          this.semesterCourseId = semesterCourseId;
          this.course = course;
          this.semester = semester;
      }

    public SemesterCourse(Course course, Semester semester) {
        this.course = course;
        this.semester = semester;
    }
}
