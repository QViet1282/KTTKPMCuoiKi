import React, { useState, useEffect } from "react";
import '../CSS/Add_subject.css';
import { Divider, Space, Table, Button, Select } from "antd";
import axios from "axios";

function Add_subject() {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [registeredSubjects, setRegisteredSubjects] = useState({});
  const [majorCourses, setMajorCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedFaculty) {
      fetchMajorById();
      fetchSemester();
    }
  }, [selectedFaculty]);

  useEffect(() => {
    if (selectedMajor && selectedSemester) {
      fetchCourseByMajor();
      fetchCourseSelected();
    }
  }, [selectedMajor, selectedSemester]);

  const fetchDepartments = async () => {
    try {
      const departmentsResponse = await axios.get('http://localhost:8080/department/all');
      setDepartments(departmentsResponse.data);
      console.log('Departments:', departmentsResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchMajorById = async () => {
    try {
      const majorsResponse = await axios.get(`http://localhost:8080/major/all/departmentId?departmentId=${selectedFaculty}`);
      setMajors(majorsResponse.data);
      console.log('Majors:', majorsResponse.data);
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

  const fetchCourseByMajor = async () => {
    try {
      const majorCoursesResponse = await axios.get(`http://localhost:8080/course/all/majorId?majorId=${selectedMajor}`);
      setMajorCourses(majorCoursesResponse.data);
      console.log('Major Courses:', majorCoursesResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchCourseSelected = async () => {
    try {
      const selectedCoursesResponse = await axios.get(`http://localhost:8080/semester-course/selected-courses?majorId=${selectedMajor}&semesterId=${selectedSemester}`);
      setSelectedCourses(selectedCoursesResponse.data);
      console.log('Selected Courses:', selectedCoursesResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAddSubject = (subject) => {
    if (
      subject &&
      !subjectList.some(
        (item) =>
          item.subject === subject
      )
    ) {
      setSubjectList([
        ...subjectList,
        {
          faculty: selectedFaculty,
          major: selectedMajor,
          subject: subject,
          semester: selectedSemester,
        },
      ]);
    }
  };

  const handleRegisterSubject = (subject) => {
    setRegisteredSubjects({
      ...registeredSubjects,
      [subject]: true,
    });
  };

  const handleUnregisterSubject = (subject) => {
    setRegisteredSubjects((prev) => {
      const newRegisteredSubjects = { ...prev };
      delete newRegisteredSubjects[subject];
      return newRegisteredSubjects;
    });

    setSubjectList((prev) => prev.filter((item) => item.subject !== subject));
  };

  const renderColumns = () => {
    return [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Môn học",
        dataIndex: "subject",
        key: "subject",
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            {!registeredSubjects[record.subject] && (
              <Button
                type="primary"
                onClick={() => handleAddSubject(record.subject)}
              >
                Thêm
              </Button>
            )}
            {registeredSubjects[record.subject] && (
              <Button type="danger" onClick={() => handleUnregisterSubject(record.subject)}>
                Hủy
              </Button>
            )}
          </Space>
        ),
      },
    ];
  };

  const renderTableData = () => {
    const filteredCourses = majorCourses.filter(
      (course) => !subjectList.some((selected) => selected.subject === course.subjectId)
    );

    return filteredCourses.map((course, index) => ({
      key: index,
      stt: index + 1,
      subject: course.courseName,
    }));
  };

  const renderRegisteredSubjects = () => {
    return subjectList.map((item, index) => ({
      key: index,
      stt: index + 1,
      subject: item.subject,
    }));
  };

  return (
    <div>
      <div className="add_lessons">
        <h2 className="text-primary">Chọn Khoa, Ngành, và Học kỳ</h2>
        <div className="col-md-6">
          <div className="row">
            <label className="col">Khoa: </label>
            <Select
              className="col w-25"
              value={selectedFaculty}
              onChange={(value) => {
                setSelectedFaculty(value);
                setSelectedMajor("");
                setSelectedSemester("");
              }}
              placeholder="Chọn khoa"
            >
              {departments.map((faculty, index) => (
                <Select.Option key={index} value={faculty.departmentId}>
                  {faculty.departmentName}
                </Select.Option>
              ))}
            </Select>
            {selectedFaculty && (
              <div className="row mt-2">
                <label className="col">Ngành: </label>
                <Select
                  className="col w-25"
                  value={selectedMajor}
                  onChange={(value) => {
                    setSelectedMajor(value);
                    setSelectedSemester("");
                  }}
                  placeholder="Chọn ngành"
                >
                  {majors.map((major, index) => (
                    <Select.Option key={index} value={major.majorId}>
                      {major.majorName}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}

            {selectedMajor && (
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
            )}
          </div>
        </div>
      </div>

      <Divider />

      <div className="add_lessons2">
        <div className="row w-75">
          <div className="col-6 border">
            <Divider />
            <h2 className="text-primary">Các môn học</h2>
            <Table
              columns={renderColumns()}
              dataSource={renderTableData()}
            />
          </div>
          <div className="col-6 border">
            <Divider />
            <h2 className="text-primary">Các môn đã chọn</h2>
            <Table
              columns={renderColumns()}
              dataSource={renderRegisteredSubjects()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_subject;
