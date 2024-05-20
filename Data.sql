USE dbck;

-- Department
INSERT INTO department (department_name) VALUES
('Computer Science'),
('Mathematics'),
('Physics');

-- Major
INSERT INTO major (major_name, department_id) VALUES
('Software Engineering', (SELECT department_id FROM department WHERE department_name = 'Computer Science')),
('Data Science', (SELECT department_id FROM department WHERE department_name = 'Computer Science')),
('Applied Mathematics', (SELECT department_id FROM department WHERE department_name = 'Mathematics'));

-- Teacher
INSERT INTO teacher (name, teacher_code, password, email, phone, address, dob, gender, major_major_id) VALUES
('Dr. Smith', 'T001', 'pass123', 'smith@example.com', '123456789', '123 Main Street, City, Country', '1975-04-12', 'Male', (SELECT major_id FROM major WHERE major_name = 'Software Engineering')),
('Dr. Johnson', 'T002', 'pass123', 'johnson@example.com', '987654321', '456 Elm Street, City, Country', '1980-08-20', 'Female', (SELECT major_id FROM major WHERE major_name = 'Data Science')),
('Dr. Adams', 'T003', 'pass123', 'adams@example.com', '456123789', '789 Oak Street, City, Country', '1972-02-25', 'Male', (SELECT major_id FROM major WHERE major_name = 'Applied Mathematics'));

-- Course
INSERT INTO course (course_name, credit_fee, credit_hour, is_optional, major_id) VALUES
('Introduction to Programming', 1000, 3, 0, (SELECT major_id FROM major WHERE major_name = 'Software Engineering')),
('Data Structures', 1200, 4, 0, (SELECT major_id FROM major WHERE major_name = 'Software Engineering')),
('Calculus I', 900, 3, 0, (SELECT major_id FROM major WHERE major_name = 'Applied Mathematics')),
('Physics I', 1100, 3, 0, (SELECT major_id FROM major WHERE major_name = 'Applied Mathematics')),
('Advanced Programming', 1300, 4, 1, (SELECT major_id FROM major WHERE major_name = 'Software Engineering'));

-- Course Prerequisite
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
((SELECT course_id FROM course WHERE course_name = 'Introduction to Programming'), (SELECT semester_id FROM semester WHERE semester_name = 'Spring 2024')),
((SELECT course_id FROM course WHERE course_name = 'Data Structures'), (SELECT semester_id FROM semester WHERE semester_name = 'Spring 2024')),
((SELECT course_id FROM course WHERE course_name = 'Calculus I'), (SELECT semester_id FROM semester WHERE semester_name = 'Fall 2024'));

-- Class
INSERT INTO class (current_students, day_of_week, end_period, teacher_id, location, max_students, number_of_sessions, semester_course_id, start_date, start_period, name) VALUES
(20, 2, 4, (SELECT teacher_id FROM teacher WHERE name = 'Dr. Smith'), 'Room 101', 30, 15, (SELECT semester_course_id FROM semester_course WHERE course_id = (SELECT course_id FROM course WHERE course_name = 'Introduction to Programming') AND semester_id = (SELECT semester_id FROM semester WHERE semester_name = 'Spring 2024')), '2024-01-15', 2, 'ABC1'),
(25, 3, 5, (SELECT teacher_id FROM teacher WHERE name = 'Dr. Johnson'), 'Room 202', 30, 15, (SELECT semester_course_id FROM semester_course WHERE course_id = (SELECT course_id FROM course WHERE course_name = 'Data Structures') AND semester_id = (SELECT semester_id FROM semester WHERE semester_name = 'Spring 2024')), '2024-01-16', 3, 'ABC2');

-- Student
INSERT INTO student (student_code, password, name, email, phone, address, dob, gender, major_id) VALUES
('SV001', '123', 'Alice Johnson', 'alice@example.com', '123456789', '123 Main Street, City, Country', '1990-01-01', 'Female', (SELECT major_id FROM major WHERE major_name = 'Software Engineering')),
('SV002', '123', 'Bob Smith', 'bob@example.com', '987654321', '456 Elm Street, City, Country', '1992-05-15', 'Male', (SELECT major_id FROM major WHERE major_name = 'Software Engineering')),
('SV003', '123', 'Charlie Brown', 'charlie@example.com', '456123789', '789 Oak Street, City, Country', '1995-10-20', 'Male', (SELECT major_id FROM major WHERE major_name = 'Software Engineering'));

-- Enrollment
INSERT INTO enrollment (created_at, student_id, course_class_id) VALUES
('2023-12-15 10:00:00', (SELECT student_id FROM student WHERE student_code = 'SV001'), (SELECT course_class_id FROM class WHERE name = 'ABC1')),
('2023-12-16 11:00:00', (SELECT student_id FROM student WHERE student_code = 'SV002'), (SELECT course_class_id FROM class WHERE name = 'ABC1')),
('2023-12-17 12:00:00', (SELECT student_id FROM student WHERE student_code = 'SV003'), (SELECT course_class_id FROM class WHERE name = 'ABC1'));

-- WaitlistEnrollment
INSERT INTO waitlist_enrollment (created_at, course_class_id, student_id) VALUES
('2023-12-18 13:00:00', (SELECT course_class_id FROM class WHERE name = 'ABC2'), (SELECT student_id FROM student WHERE student_code = 'SV003'));

-- Schedule
INSERT INTO schedule (date, end_period, start_period, course_class_id) VALUES
('2024-01-15', 4, 2, (SELECT course_class_id FROM class WHERE name = 'ABC1')),
('2024-01-17', 4, 2, (SELECT course_class_id FROM class WHERE name = 'ABC1')),
('2024-01-19', 4, 2, (SELECT course_class_id FROM class WHERE name = 'ABC1')),
('2024-01-16', 5, 3, (SELECT course_class_id FROM class WHERE name = 'ABC2')),
('2024-01-18', 5, 3, (SELECT course_class_id FROM class WHERE name = 'ABC2'));

-- Admin
INSERT INTO admin (admin_code, password, name, email, phone, address, dob, gender) VALUES
('ADM001', '123', 'Admin 1', 'admin1@example.com', '123456789', '123 Main Street, City, Country', '1990-01-01', 'Male'),
('ADM002', '123', 'Admin 2', 'admin2@example.com', '987654321', '456 Elm Street, City, Country', '1992-05-15', 'Female'),
('ADM003', '123', 'Admin 3', 'admin3@example.com', '456123789', '789 Oak Street, City, Country', '1995-10-20', 'Male');

-- Grade
INSERT INTO grade (passed, score, enrollment_id) VALUES
(1, 85.5, (SELECT enrollment_id FROM enrollment WHERE student_id = (SELECT student_id FROM student WHERE student_code = 'SV001') AND course_class_id = (SELECT course_class_id FROM class WHERE name = 'ABC1'))),
(1, 90.0, (SELECT enrollment_id FROM enrollment WHERE student_id = (SELECT student_id FROM student WHERE student_code = 'SV002') AND course_class_id = (SELECT course_class_id FROM class WHERE name = 'ABC1'))),
(0, 65.0, (SELECT enrollment_id FROM enrollment WHERE student_id = (SELECT student_id FROM student WHERE student_code = 'SV003') AND course_class_id = (SELECT course_class_id FROM class WHERE name = 'ABC1')));
