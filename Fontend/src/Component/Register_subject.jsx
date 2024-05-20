import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, Select } from 'antd';
import axios from 'axios';
import "../CSS/Register_subject.css";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register_subject() {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseClasses, setCourseClasses] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [semesters, setSemesters] = useState([]);
  const fetchUser = async () => {
    const userString = await AsyncStorage.getItem("auth");
    const user = JSON.parse(userString);
    const userId = user.studentNumber;
    setUserId(userId)
  };


  const fetchSemester = async () => {
    try {
      const semestersResponse = await axios.get('http://localhost:8080/semester/all');
      setSemesters(semestersResponse.data);
      console.log('Semesters:', semestersResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const availableCoursesResponse = await axios.get(`http://localhost:8080/course/available-courses?studentId=${userId}&semesterId=${selectedSemester}`);
      setAvailableCourses(availableCoursesResponse.data);
      console.log('Available Courses:', availableCoursesResponse.data);
    } catch (error) {
      console.error("Error fetching available courses", error);
    }
  };

  const fetchCourseClasses = async (courseId) => {
    try {
      const courseClassesResponse = await axios.get(`http://localhost:8080/course-class/find-by-course-id?courseId=${courseId}`);
      setCourseClasses(courseClassesResponse.data);
      console.log('Course Classes:', courseClassesResponse.data);
    } catch (error) {
      console.error("Error fetching course classes", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSemester()
  }, []);

  useEffect(() => {
    if (selectedSemester!='')
      fetchAvailableCourses();
  }, [userId,selectedSemester]);

  const columns = [
    {
      title: "STT",
      dataIndex: "courseId",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Môn học",
      dataIndex: "courseName",
    },
    {
      title: "Học phí",
      dataIndex: "creditFee",
    },
    {
      title: "Tín chỉ",
      dataIndex: "creditHour",
    },
    {
      title: "Môn tiên quyết",
      dataIndex: "prerequisites",
      render: (text) => text.join(", "),
    },
    {
      title: "Hành động",
      render: (text, record) => (
        <Button onClick={() => handleRowSelection(record)}>Chọn</Button>
      ),
    },
  ];

  const handleRowSelection = (record) => {
    setSelectedCourses([...selectedCourses, record]);
  };
  console.log(availableCourses);
  return (
    <div>
      <div className="row mt-2">
        <label className="col">Học kỳ: </label>
        <Select
          className="col w-25"
          value={selectedSemester}
          onChange={(value) => setSelectedSemester(value)}
          placeholder="Chọn học kỳ"
        >
          {semesters.map((semester, index) => (
            <Select.Option key={index} value={semester.semesterId}>
              {semester.semesterName}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="row">
        <Divider />
        <h3>Các môn có thể đăng ký:</h3>
        <Table
          columns={columns}
          dataSource={availableCourses}
          rowKey="courseId"
        />
      </div>
      {selectedCourses.length > 0 && (
        <div className="row">
          <Divider />
          <h3>Lớp của các môn đã chọn:</h3>
          <Table
            columns={columns}
            dataSource={courseClasses}
            rowKey="courseId"
          />
        </div>
      )}
      {/* Table for displaying successfully registered courses */}
      {/* Table for displaying courses in the waitlist */}
    </div>
  );
}

export default Register_subject;
