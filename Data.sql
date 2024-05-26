-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table dbck.admin: ~3 rows (approximately)
INSERT INTO `admin` (`admin_id`, `dob`, `address`, `admin_code`, `email`, `gender`, `name`, `password`, `phone`) VALUES
	(1, '1990-01-01 00:00:00.000000', '123 Main Street, City, Country', 'ADM001', 'admin1@example.com', 'Male', 'Admin 1', '123', '123456789'),
	(2, '1992-05-15 00:00:00.000000', '456 Elm Street, City, Country', 'ADM002', 'admin2@example.com', 'Female', 'Admin 2', '123', '987654321'),
	(3, '1995-10-20 00:00:00.000000', '789 Oak Street, City, Country', 'ADM003', 'admin3@example.com', 'Male', 'Admin 3', '123', '456123789');

-- Dumping data for table dbck.class: ~6 rows (approximately)
INSERT INTO `class` (`current_students`, `day_of_week`, `end_period`, `max_students`, `number_of_sessions`, `start_date`, `start_period`, `course_class_id`, `semester_course_id`, `teacher_id`, `location`, `name`) VALUES
	(20, 2, 4, 30, 15, '2024-01-15', 2, 1, 1, 1, 'Phòng 101', 'ABC1'),
	(25, 3, 5, 30, 15, '2024-01-16', 3, 2, 2, 2, 'Phòng 202', 'ABC2'),
	(0, 3, 6, 50, 10, '2024-06-06', 3, 3, 4, 1, 'C12.09', 'DH16A'),
	(0, 3, 4, 20, 10, '2024-09-06', 2, 4, 5, 2, 'B1.09', 'DH13A'),
	(30, 6, 6, 30, 10, '2024-07-06', 3, 5, 6, 3, 'D12.9', 'DHYB14'),
	(0, 2, 3, 20, 10, '2024-12-12', 1, 6, 7, 2, 'H13.09', 'DH12');

-- Dumping data for table dbck.course: ~9 rows (approximately)
INSERT INTO `course` (`credit_fee`, `credit_hour`, `is_optional`, `course_id`, `major_id`, `course_name`) VALUES
	(1000, 3, b'0', 1, 1, 'Giới Thiệu Lập Trình'),
	(1200, 4, b'0', 2, 1, 'Cấu Trúc Dữ Liệu'),
	(1300, 4, b'0', 3, 1, 'JAVA 1'),
	(1300, 4, b'1', 4, 1, 'JAVA 2'),
	(1300, 4, b'1', 5, 1, 'Logic Học'),
	(1300, 4, b'1', 6, 1, 'Vật lí đại cương'),
	(900, 3, b'0', 7, 3, 'Giải Tích I'),
	(1100, 3, b'0', 8, 3, 'Vật Lý I'),
	(1300, 4, b'1', 9, 1, 'Lập Trình Nâng Cao');

-- Dumping data for table dbck.course_prerequisite: ~3 rows (approximately)
INSERT INTO `course_prerequisite` (`course_id`, `prerequisite_course_id`) VALUES
	(2, 1),
	(9, 1),
	(4, 3);

-- Dumping data for table dbck.department: ~3 rows (approximately)
INSERT INTO `department` (`department_id`, `department_name`) VALUES
	(1, 'Công Nghệ Thông Tin'),
	(2, 'Toán Học'),
	(3, 'Vật Lý');

-- Dumping data for table dbck.enrollment: ~3 rows (approximately)
INSERT INTO `enrollment` (`course_class_id`, `created_at`, `enrollment_id`, `student_id`) VALUES
	(1, '2023-12-15 10:00:00.000000', 1, 1),
	(1, '2023-12-16 11:00:00.000000', 2, 2),
	(1, '2023-12-17 12:00:00.000000', 3, 3);

-- Dumping data for table dbck.grade: ~3 rows (approximately)
INSERT INTO `grade` (`passed`, `score`, `enrollment_id`, `grade_id`) VALUES
	(b'1', 85.5, 1, 1),
	(b'1', 90, 2, 2),
	(b'0', 65, 3, 3);

-- Dumping data for table dbck.major: ~3 rows (approximately)
INSERT INTO `major` (`department_id`, `major_id`, `major_name`) VALUES
	(1, 1, 'Công Nghệ Phần Mềm'),
	(1, 2, 'Khoa Học Dữ Liệu'),
	(2, 3, 'Toán Ứng Dụng');

-- Dumping data for table dbck.schedule: ~5 rows (approximately)
INSERT INTO `schedule` (`date`, `end_period`, `start_period`, `course_class_id`, `schedule_id`) VALUES
	('2024-01-15', 4, 2, 1, 1),
	('2024-01-17', 4, 2, 1, 2),
	('2024-01-19', 4, 2, 1, 3),
	('2024-01-16', 5, 3, 2, 4),
	('2024-01-18', 5, 3, 2, 5);

-- Dumping data for table dbck.semester: ~3 rows (approximately)
INSERT INTO `semester` (`end_date`, `semester_id`, `start_date`, `semester_name`) VALUES
	('2024-05-15 00:00:00.000000', 1, '2024-01-15 00:00:00.000000', 'HKI-2024'),
	('2024-12-15 00:00:00.000000', 2, '2024-05-16 00:00:00.000000', 'HKII-2024'),
	('2024-12-15 00:00:00.000000', 3, '2024-05-16 00:00:00.000000', 'HKIII-2024');

-- Dumping data for table dbck.semester_course: ~7 rows (approximately)
INSERT INTO `semester_course` (`course_id`, `semester_course_id`, `semester_id`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(7, 3, 2),
	(4, 4, 2),
	(2, 5, 2),
	(5, 6, 2),
	(1, 7, 2);

-- Dumping data for table dbck.student: ~3 rows (approximately)
INSERT INTO `student` (`dob`, `major_id`, `student_id`, `address`, `email`, `gender`, `name`, `password`, `phone`, `student_code`) VALUES
	('1990-01-01 00:00:00.000000', 1, 1, '123 Đường ABC, Thành phố, Quốc gia', 'vtran5312@gmail.com', 'Nữ', 'Nguyễn Thị Ánh', '123', '123456789', 'SV001'),
	('1992-05-15 00:00:00.000000', 1, 2, '456 Đường XYZ, Thành phố, Quốc gia', 'vtran5312@gmail.com', 'Nam', 'Trần Văn Bình', '123', '987654321', 'SV002'),
	('1995-10-20 00:00:00.000000', 1, 3, '789 Oak Street, City, Country', 'vtran5312@gmail.com', 'Nam', 'Lê Thị Cúc', '123', '456123789', 'SV003');

-- Dumping data for table dbck.teacher: ~4 rows (approximately)
INSERT INTO `teacher` (`department_department_id`, `dob`, `teacher_id`, `address`, `email`, `gender`, `name`, `password`, `phone`, `teacher_code`) VALUES
	(1, '1975-04-12 00:00:00.000000', 1, '123 Đường ABC, Thành phố, Quốc gia', 'nguyenvana@example.com', 'Nam', 'Thạc sĩ Nguyễn Văn A', 'pass123', '123456789', 'T001'),
	(1, '1980-08-20 00:00:00.000000', 2, '456 Đường XYZ, Thành phố, Quốc gia', 'phamthib@example.com', 'Nữ', 'Tiến sĩ Phạm Thị B', 'pass123', '987654321', 'T002'),
	(1, '1980-08-20 00:00:00.000000', 3, '456 Đường XYZ, Thành phố, Quốc gia', 'phamthi2b@example.com', 'Nữ', 'Tiến sĩ Trần Thị C', 'pass123', '987654322', 'T003'),
	(2, '1972-02-25 00:00:00.000000', 4, '789 Đường DEF, Thành phố, Quốc gia', 'levanc@example.com', 'Nam', 'Tiến sĩ Lê Văn C', 'pass123', '456123789', 'T004');

-- Dumping data for table dbck.waitlist_enrollment: ~1 rows (approximately)
INSERT INTO `waitlist_enrollment` (`course_class_id`, `created_at`, `student_id`, `waitlist_id`) VALUES
	(2, '2023-12-18 13:00:00.000000', 3, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
