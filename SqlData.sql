USE dbck;

-- Department
INSERT INTO department (department_name) VALUES
('Computer Science'),
('Mathematics'),
('Physics');

-- Major
INSERT INTO major (major_name, department_id) VALUES
('Software Engineering', 1),
('Data Science', 1),
('Applied Mathematics', 2);

-- Course
INSERT INTO course (course_name, credit_fee, credit_hour, is_optional, major_id) VALUES
('Introduction to Programming', 1000, 3, 0, 1),
('Data Structures', 1200, 4, 0, 1),
('Calculus I', 900, 3, 0, 2),
('Physics I', 1100, 3, 0, 3),
('Advanced Programming', 1300, 4, 1, 1);

-- Chèn dữ liệu vào bảng liên kết course_prerequisite
INSERT INTO course_prerequisite (course_id, prerequisite_course_id) VALUES
((SELECT course_id FROM course WHERE course_name = 'Data Structures'), 
 (SELECT course_id FROM course WHERE course_name = 'Introduction to Programming')),
((SELECT course_id FROM course WHERE course_name = 'Advanced Programming'), 
 (SELECT course_id FROM course WHERE course_name = 'Introduction to Programming'));

-- Semester
INSERT INTO semester (semester_name, start_date, end_date) VALUES
('Spring 2024', '2024-01-15', '2024-05-15'),
('Fall 2024', '2024-09-01', '2024-12-20');

-- SemesterCourse
INSERT INTO semester_course (course_id, semester_id) VALUES
( 1, 1),
( 2, 1),
( 3, 2);

-- Class
INSERT INTO class (current_students, day_of_week, end_period, instructor, location, max_students, number_of_sessions, semester_course_id, start_date, start_period, name) VALUES
(20, 2, 4, 'Dr. Smith', 'Room 101', 30, 15, 1, '2024-01-15', 2,'ABC1'),
(25, 3, 5, 'Dr. Johnson', 'Room 202', 30, 15, 2, '2024-01-16', 3,'ABC2');

-- Student
INSERT INTO student (student_code,password, name, email, phone, address, dob, gender, major_id) VALUES
('SV001','123', 'Alice Johnson', 'alice@example.com', '123456789', '123 Main Street, City, Country', '1990-01-01', 'Female', 1),
('SV002','123', 'Bob Smith', 'bob@example.com', '987654321', '456 Elm Street, City, Country', '1992-05-15', 'Male', 1),
('SV003','123', 'Charlie Brown', 'charlie@example.com', '456123789', '789 Oak Street, City, Country', '1995-10-20', 'Male', 1);



-- Enrollment
INSERT INTO enrollment (created_at, student_id, course_class_id) VALUES
('2023-12-15 10:00:00', 1, 1),
('2023-12-16 11:00:00', 2, 1),
('2023-12-17 12:00:00', 3, 1);

-- WaitlistEnrollment
INSERT INTO waitlist_enrollment (created_at, course_class_id, student_id) VALUES
('2023-12-18 13:00:00', 2, 3);

-- Schedule
INSERT INTO schedule (date, end_period, start_period, course_class_id) VALUES
('2024-01-15', 4, 2, 1),
('2024-01-17', 4, 2, 1),
('2024-01-19', 4, 2, 1),
('2024-01-16', 5, 3, 2),
('2024-01-18', 5, 3, 2);

-- Admin
INSERT INTO admin (admin_code,password, name, email, phone, address, dob, gender) VALUES
('ADM001','123', 'Admin 1', 'admin1@example.com', '123456789', '123 Main Street, City, Country', '1990-01-01', 'Male'),
('ADM002','123', 'Admin 2', 'admin2@example.com', '987654321', '456 Elm Street, City, Country', '1992-05-15', 'Female'),
('ADM003','123', 'Admin 3', 'admin3@example.com', '456123789', '789 Oak Street, City, Country', '1995-10-20', 'Male');


-- Grade
INSERT INTO grade (passed, score, enrollment_id) VALUES
(1, 85.5, 1),
(1, 90.0, 2),
(0, 65.0, 3);
