package vn.edu.iuh.fit.baitapck.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GenericRequestDTO {
    private Long majorId;
    private Long semesterId;
    private Long departmentId;
    private Long courseId;
    private Long studentId;
    private Long scheduleId;
//    private Long prerequisiteId;
    private Long waitlistEnrollmentId;
    private Long enrollmentId;
    private Long semesterCourseId;
    private Long courseClassId;
    private String studentCode;
    private String password;
    private String adminCode;
}
