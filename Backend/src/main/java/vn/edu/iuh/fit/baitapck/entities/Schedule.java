package vn.edu.iuh.fit.baitapck.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@NoArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "course_class_id", nullable = false)
    private CourseClass courseClass;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "start_period", nullable = false)
    private int startPeriod;

    @Column(name = "end_period", nullable = false)
    private int endPeriod;



    // Constructor
    public Schedule(Long scheduleId, CourseClass courseClass, Date date, int startPeriod, int endPeriod) {
        this.scheduleId = scheduleId;
        this.courseClass = courseClass;
        this.date = date;
        this.startPeriod = startPeriod;
        this.endPeriod = endPeriod;
    }
}
