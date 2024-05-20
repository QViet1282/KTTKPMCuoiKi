import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, Select } from 'antd';
import axios from 'axios';
import "../CSS/Register_subject.css";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register_subject() {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseClasses, setCourseClasses] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [data, setData] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [waitingCourses, setWaitingCourses] = useState([]);
  const fetchUser = async () => {
    const userString = await AsyncStorage.getItem("auth");
    const user = JSON.parse(userString);
    const userId = user.studentNumber;
    setUserId(userId)
  };

  const fetchWaitingCourses = async () => {
    try {
      const waitingCoursesResponse = await axios.get(`http://localhost:8080/course/student/wait-list-courses?studentId=${userId}`);
      setWaitingCourses(waitingCoursesResponse.data);
      console.log('Waiting Courses:', waitingCoursesResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      const registeredCoursesResponse = await axios.get(`http://localhost:8080/course/student/enrolled-courses?studentId=${userId}&semesterId=${selectedSemester}`);
      setRegisteredCourses(registeredCoursesResponse.data);
      console.log('Registered Courses:', registeredCoursesResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
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
    fetchSemester();

  }, []);

  useEffect(() => {
    if (selectedSemester !== '') {
      fetchAvailableCourses();
      fetchRegisteredCourses();
      fetchWaitingCourses();
    }


  }, [userId, selectedSemester]);

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
  const columns3 = [
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
        <Button onClick={() => { }}>Xem chi tiết</Button>
      ),
    },
  ];

  const columns2 = [
    {
      title: 'ID lớp học',
      dataIndex: 'courseClassId',
      key: 'courseClassId',
    },
    {
      title: 'Tên lớp học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng tối đa sinh viên',
      dataIndex: 'maxStudents',
      key: 'maxStudents',
    },
    {
      title: 'Số lượng hiện tại sinh viên',
      dataIndex: 'currentStudents',
      key: 'currentStudents',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Thứ trong tuần',
      dataIndex: 'dayOfWeek',
      key: 'dayOfWeek',
    },
    {
      title: 'Tiết bắt đầu',
      dataIndex: 'startPeriod',
      key: 'startPeriod',
    },
    {
      title: 'Tiết kết thúc',
      dataIndex: 'endPeriod',
      key: 'endPeriod',
    },
    {
      title: 'Số buổi',
      dataIndex: 'numberOfSessions',
      key: 'numberOfSessions',
    },
    {
      title: 'Hành động',
      render: (text, record) => (
        <Button onClick={() => handleRegister(record)}>Đăng ký</Button>
      ),
    },
  ];

  const handleRowSelection = async (record) => {
    const response = await axios.get(`http://localhost:8080/semester-course/get?courseId=${record.courseId}&semesterId=${selectedSemester}`);
    const semesterCourse = response.data[0];
    fetchClasses(semesterCourse.semesterCourseId);
  };

  const handleRegister = async (record) => {
    const response = await axios.post(`http://localhost:8080/student/register_course`,
      {
        studentId: userId,
        courseClassId: record.courseClassId
      }
    );
    fetchAvailableCourses();
    setData([])
    fetchRegisteredCourses();
    fetchWaitingCourses();
    console.log("Registering for class:", record);
  };

  const fetchClasses = async (semesterCourseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/course-class/find-by-semester-course-id?semesterCourseId=${semesterCourseId}`);
      const formattedData = response.data.map(item => ({
        ...item,
        instructor: item.instructor.name,
      }));
      setData(formattedData);
      console.log('Fetched Classes:', formattedData);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

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

      <div className="row">
        <Divider />
        <h3>Lớp của môn đã chọn:</h3>
        <Table
          columns={columns2}
          dataSource={data}
          rowKey="courseClassId"
        />
      </div>
      <div className="row">
        <Divider />
        <h3>Môn đăng kí thành công:</h3>
        <Table
          columns={columns3}
          dataSource={registeredCourses}
          rowKey="courseClassId"
        />
      </div>
      <div className="row">
        <Divider />
        <h3>Môn đăng kí vào danh sách chờ:</h3>
        <Table
          columns={columns3}
          dataSource={waitingCourses}
          rowKey="courseClassId"
        />
      </div>
    </div>
  );
}

export default Register_subject;
