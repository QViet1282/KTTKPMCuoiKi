import React from 'react'
import { Space, Table, Tag } from 'antd';

function Add_classes() {
    const columns = [
        {
          title: 'Khoa',
          dataIndex: 'faculty',
          key: 'faculty',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Ngành',
          dataIndex: 'major',
          key: 'major',
        },
        {
            title: 'Môn học',
            dataIndex: 'subject',
            key: 'subject',
          },
        {
            title: 'Học kỳ',
            dataIndex: 'semester',
            key: 'semester',
          },
        {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a className='text-primary'>Chấp thuận {record.name}</a>
              <a className='text-danger'>Hủy</a>
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          faculty: 'Khoa Công Nghệ Thông Tin',
          major: "Kỹ thuật phần mềm",
          subject: 'Ngôn ngữ C++',
          semester: 'học kỳ 1'
        },
        {
            faculty: 'Khoa Công Nghệ Thông Tin',
            major: "Kỹ thuật phần mềm",
            subject: 'Ngôn ngữ C++',
            semester: 'học kỳ 1'
        },
        {
          key: '3',
          faculty: 'Khoa Công Nghệ Thông Tin',
          major: "Kỹ thuật phần mềm",
          subject: 'Ngôn ngữ C++',
          semester: 'học kỳ 1'
        },
      ];
  return (
    // <Header/>
    <div className="list_classes">
        <h3 className=''>Danh sách chờ mở lớp</h3>
        <div className="content">

        <div className='col-md-8'>
            <Table className='' columns={columns} dataSource={data}/>
        </div>
        </div>
    </div>
  )
}

export default Add_classes