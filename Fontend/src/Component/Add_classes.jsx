import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Select, DatePicker } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

function AddClasses() {
  const locatio = useLocation();
  const { semesterCourse, selectedFaculty } = locatio.state || {};

  const [maxStudents, setMaxStudents] = useState('');
  const [currentStudents, setCurrentStudents] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startPeriod, setStartPeriod] = useState('');
  const [endPeriod, setEndPeriod] = useState('');
  const [numberOfSessions, setNumberOfSessions] = useState('');
  const [name, setName] = useState('');

  const [data, setData] = useState([]);

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, [selectedFaculty]);

  useEffect(() => {
    if (semesterCourse.semesterCourseId) {
      fetchClasses(semesterCourse.semesterCourseId);
    }
  }, [semesterCourse]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/teacher/department/${selectedFaculty}`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  const fetchClasses = async (semesterCourseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/course-class/find-by-semester-course-id?semesterCourseId=${semesterCourseId}`);
      const formattedData = response.data.map(item => ({
        key: item.courseClassId,
        name: item.name,
        maxStudents: item.maxStudents,
        currentStudents: item.currentStudents,
        location: item.location,
        instructor: item.instructor.name,
        startDate: item.startDate,
        dayOfWeek: item.dayOfWeek,
        startPeriod: item.startPeriod,
        endPeriod: item.endPeriod,
        numberOfSessions: item.numberOfSessions
      }));
      setData(formattedData);
      console.log('Fetched Classes:', formattedData);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  const handleAddClass = async () => {
    const newClass = {
      semesterCourse,
      maxStudents: parseInt(maxStudents),
      location,
      instructor: {
        teacherId: parseInt(selectedTeacher)
      },
      name,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
      dayOfWeek: parseInt(dayOfWeek),
      startPeriod: parseInt(startPeriod),
      endPeriod: parseInt(endPeriod),
      numberOfSessions: parseInt(numberOfSessions)
    };

    console.log(newClass);
    try {
      const response = await axios.post('http://localhost:8080/course-class/add', newClass);
      const addedClass = response.data;
      setMaxStudents('');
      setCurrentStudents('');
      setName('');
      setLocation('');
      setStartDate(null);
      setDayOfWeek('');
      setStartPeriod('');
      setEndPeriod('');
      setNumberOfSessions('');
      fetchClasses(semesterCourse.semesterCourseId);
      console.log('Added Class:', addedClass);
    } catch (error) {
      console.error("Error adding class", error);
    }
  };

  const columns = [
    {
      title: 'ID lớp học',
      dataIndex: 'key',
      key: 'key',
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
  ];

  console.log(data);
  return (
    <div className="list_classes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h3 className="" style={{ textAlign: 'center' }}>Danh sách lớp</h3>
      <div className="form-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', marginBottom: '20px' }}>
        <Input
          placeholder="Nhập Số lượng tối đa sinh viên"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Select
          placeholder="Chọn giáo viên"
          style={{ width: '100%', marginBottom: '10px' }}
          value={selectedTeacher}
          onChange={(value) => setSelectedTeacher(value)}
        >
          {teachers.map(teacher => (
            <Option key={teacher.id} value={teacher.teacherId}>{teacher.name}</Option>
          ))}
        </Select>
        <Input
          placeholder="Nhập địa điểm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Nhập tên lớp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <DatePicker
          placeholder="Ngày bắt đầu"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <Input
          placeholder="Thứ trong tuần"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Tiết bắt đầu"
          value={startPeriod}
          onChange={(e) => setStartPeriod(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Tiết kết thúc"
          value={endPeriod}
          onChange={(e) => setEndPeriod(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Số lượng buổi học"
          value={numberOfSessions}
          onChange={(e) => setNumberOfSessions(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        <Button type="primary" onClick={handleAddClass}>
          Tạo lớp
        </Button>
      </div>
      <div className="table-container" style={{ width: '80%' }}>
        <Table columns={columns} dataSource={data} rowKey="key" />
      </div>
    </div>
  );
}

export default AddClasses;
