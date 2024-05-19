package vn.edu.iuh.fit.baitapck.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CourseDTO {
    private Long courseId;
    private String courseName;
    private int creditFee;
    private int creditHour;
    private boolean optional;
    private List<String> prerequisites;
}
