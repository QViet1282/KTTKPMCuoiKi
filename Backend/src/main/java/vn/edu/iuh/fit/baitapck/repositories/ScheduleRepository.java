package vn.edu.iuh.fit.baitapck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.baitapck.entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}