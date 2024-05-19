package vn.edu.iuh.fit.baitapck.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "class")
@Getter
@Setter
@NoArgsConstructor
public class CourseClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_class_id")
    private Long courseClassId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "semester_course_id", nullable = false)
    private SemesterCourse semesterCourse;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "max_students")
    private int maxStudents;

    @Column(name = "current_students", nullable = false, columnDefinition = "int default 0")
    private int currentStudents;

    @Column(name = "location", nullable = true)
    private String location;

    @ManyToOne
//    @Column(name = "instructor", nullable = true)
    private Teacher instructor;

    @Column(name = "start_date", nullable = true)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "day_of_week", nullable = true)
    private int dayOfWeek;  // 1: Sunday, 2: Monday, ..., 7: Saturday

    @Column(name = "start_period", nullable = true)
    private int startPeriod;

    @Column(name = "end_period", nullable = true)
    private int endPeriod;

    @Column(name = "number_of_sessions", nullable = true)
    private int numberOfSessions;



    @JsonIgnore
    @OneToMany(mappedBy = "enrolledClass")
    private Set<Enrollment> enrollments = new HashSet<>();

    public CourseClass(Long courseClassId, SemesterCourse semesterCourse, int maxStudents, int currentStudents, String location, Teacher instructor, Date startDate, int dayOfWeek, int startPeriod, int endPeriod, int numberOfSessions) {
        this.courseClassId = courseClassId;
        this.semesterCourse = semesterCourse;
        this.maxStudents = maxStudents;
        this.currentStudents = currentStudents;
        this.location = location;
        this.instructor = instructor;
        this.startDate = startDate;
        this.dayOfWeek = dayOfWeek;
        this.startPeriod = startPeriod;
        this.endPeriod = endPeriod;
        this.numberOfSessions = numberOfSessions;
    }
}

