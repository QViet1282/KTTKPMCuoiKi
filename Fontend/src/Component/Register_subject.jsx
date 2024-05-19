import React, { useState } from "react";
import "../CSS/Register_subject.css";
import { Divider, Table } from "antd";

function Register_subject() {
  const [selectionType] = useState("checkbox");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Môn học",
      dataIndex: "course",
    },
    {
      title: "Học phí",
      dataIndex: "creditFee",
    },
    {
      title: "Tín chỉ",
      dataIndex: "creditHours",
    },
    {
      title: "Môn tiên quyết",
      dataIndex: "prerequisites",
    },
  ];

  const rawData = [
    {
      key: "1",
      course: "Introduction to Programming",
      creditFee: 1000,
      creditHours: 3,
      prerequisites: "",
    },
    {
      key: "2",
      course: "Data Structures",
      creditFee: 1200,
      creditHours: 4,
      prerequisites: "Introduction to Programming",
    },
    {
      key: "3",
      course: "Algorithms",
      creditFee: 1300,
      creditHours: 4,
      prerequisites: "Data Structures",
    },
    {
      key: "4",
      course: "Database Systems",
      creditFee: 1100,
      creditHours: 3,
      prerequisites: "Introduction to Programming",
    },
    {
      key: "5",
      course: "Operating Systems",
      creditFee: 1250,
      creditHours: 4,
      prerequisites: "Data Structures",
    },
    {
      key: "6",
      course: "Software Engineering",
      creditFee: 1400,
      creditHours: 4,
      prerequisites: "Introduction to Programming",
    },
    {
      key: "7",
      course: "Computer Networks",
      creditFee: 1150,
      creditHours: 3,
      prerequisites: "Introduction to Programming",
    },
    {
      key: "8",
      course: "Artificial Intelligence",
      creditFee: 1500,
      creditHours: 4,
      prerequisites: "Algorithms",
    },
    {
      key: "9",
      course: "Machine Learning",
      creditFee: 1600,
      creditHours: 4,
      prerequisites: "Artificial Intelligence",
    },
    {
      key: "10",
      course: "Cyber Security",
      creditFee: 1450,
      creditHours: 4,
      prerequisites: "Computer Networks",
    },
  ];

  const data = rawData.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  const rowSelection = {
    type: selectionType,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCourses(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div>
      <div className="register_subject">
        <div className="row w-25">
          <div className="col-md-6">
            <b>Đợt đăng ký</b>
          </div>
          <div className="col-md-6">
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Học kỳ</option>
              <option value="1">HK1</option>
              <option value="2">HK2</option>
              <option value="3">HK3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <Divider />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
      {selectedCourses.length > 0 && (
        <div className="row">
          <Divider />
          <h3>Các môn đã chọn:</h3>
          <Table columns={columns} dataSource={selectedCourses} />
        </div>
      )}
    </div>
  );
}

export default Register_subject;
