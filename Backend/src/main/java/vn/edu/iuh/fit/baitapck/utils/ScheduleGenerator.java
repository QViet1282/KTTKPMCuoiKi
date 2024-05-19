package vn.edu.iuh.fit.baitapck.utils;

import vn.edu.iuh.fit.baitapck.entities.CourseClass;
import vn.edu.iuh.fit.baitapck.entities.Schedule;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class ScheduleGenerator {

    public static List<Schedule> generateSchedules(CourseClass clazz) {
        List<Schedule> schedules = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(clazz.getStartDate());

        // Adjust to the first occurrence of the specified day of the week
        while (calendar.get(Calendar.DAY_OF_WEEK) != clazz.getDayOfWeek()) {
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }

        for (int i = 0; i < clazz.getNumberOfSessions(); i++) {
            Date sessionDate = calendar.getTime();

            // Create a new Schedule object
            Schedule schedule = new Schedule();
            schedule.setCourseClass(clazz);
            schedule.setDate(sessionDate);
            schedule.setStartPeriod(clazz.getStartPeriod());
            schedule.setEndPeriod(clazz.getEndPeriod());

            schedules.add(schedule);

            // Move to the next week
            calendar.add(Calendar.DAY_OF_MONTH, 7);
        }

        return schedules;
    }
}
