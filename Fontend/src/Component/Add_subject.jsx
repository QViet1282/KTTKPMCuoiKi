import React, { useState, useEffect } from "react";
import '../CSS/Add_subject.css';
import { Divider, Space, Table, Button, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add_subject() {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [registeredSubjects, setRegisteredSubjects] = useState({});
  const [majorCourses, setMajorCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();
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
      const majorsData = majorsResponse.data;

      if (Array.isArray(majorsData)) {
        setMajors(majorsData);
      } else {
        console.error("Majors data is not an array", majorsData);
        setMajors([]);
      }

      console.log('Majors:', majorsData);
    } catch (error) {
      console.error("Error fetching data", error);
      setMajors([]); // Set majors to an empty array in case of error
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

  const handleAddSubject = async (record) => {
    try {
      console.log('fsg', record);
      await axios.post('http://localhost:8080/semester-course/add', {
        courseId: record.key,
        semesterId: selectedSemester
      });
      // setSelectedCourses([...selectedCourses, { courseName: record.courseName }]);
      fetchCourseByMajor()
      fetchCourseSelected()
    } catch (error) {
      console.error("Error adding subject", error);
    }
  };

  // const handleRegisterSubject = (subject) => {
  //   setRegisteredSubjects({
  //     ...registeredSubjects,
  //     [subject]: true,
  //   });
  // };

  const handleCourseClass = async (record) => {
    try {
      const response = await axios.get(`http://localhost:8080/semester-course/get?courseId=${record.key}&semesterId=${selectedSemester}`);
      const semesterCourse = response.data[0];
      // console.log(response.data);
      navigate(`/app/add_classes`, { state: { semesterCourse, selectedFaculty } });
    } catch (error) {
      console.error("Error removing subject", error);
    }
  };
  const renderTableData = () => {
    if (majorCourses) {
      const filteredCourses = majorCourses.filter(
        (course) => !selectedCourses.some((selected) => selected.courseName === course.courseName)
      );
      return filteredCourses.map((course, index) => ({
        key: course.courseId,
        stt: index + 1,
        subject: course.courseName,
        optional: course.optional,
        creditFee: course.creditFee,
        creditHour: course.creditHour,
        prerequisites: course.prerequisites.join(", ")
      }));
    }



  };

  const renderRegisteredSubjects = () => {
    return selectedCourses.map((item, index) => ({
      key: item.courseId,
      stt: index + 1,
      subject: item.courseName,
      optional: item.optional,
      creditFee: item.creditFee,
      creditHour: item.creditHour,
      prerequisites: item.prerequisites.join(", ")
    }));
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
        title: "Loại học phần",
        dataIndex: "optional",
        render: (option) => (
          <span>{option ? 'Tự chọn' : 'Bắt buộc'}</span>
        ),
      },
      {
        title: "Học phí",
        dataIndex: "creditFee",
        key: "creditFee",
      },
      {
        title: "Số tín chỉ",
        dataIndex: "creditHour",
        key: "creditHour",
      },
      {
        title: "Môn tiên quyết",
        dataIndex: "prerequisites",
        key: "prerequisites",
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => handleAddSubject(record)}
            >
              Thêm
            </Button>
          </Space>
        ),
      },
    ];
  };
  const renderColumns2 = () => {
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
        title: "Loại học phần",
        dataIndex: "optional",
        render: (option) => (
          <span>{option ? 'Tự chọn' : 'Bắt buộc'}</span>
        ),
      },
      {
        title: "Học phí",
        dataIndex: "creditFee",
        key: "creditFee",
      },
      {
        title: "Số tín chỉ",
        dataIndex: "creditHour",
        key: "creditHour",
      },
      {
        title: "Môn tiên quyết",
        dataIndex: "prerequisites",
        key: "prerequisites",
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => handleCourseClass(record)}
            >
              Lớp
            </Button>
          </Space>
        ),
      },
    ];
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
        <div className="row">
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
              columns={renderColumns2()}
              dataSource={renderRegisteredSubjects()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_subject;
