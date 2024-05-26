import { Alert, Button, Form, Input, Radio } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      if (role === "student") {
        await loginStudent(username, password);
      } else {
        await loginAdmin(username, password);
      }
    } catch (error) {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  const loginStudent = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/student/login', {
        studentCode: username,
        password: password
      });

      if (response.data) {
        console.log('student login:', response.data);
        await AsyncStorage.setItem("auth", JSON.stringify(response.data));
        navigate("app", { state: { role: "student" } });
      } else {
        Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Error logging in student:', error);
      Alert.alert('Đăng nhập thất bại', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const loginAdmin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        adminCode: username,
        password: password
      });

      if (response.data) {
        console.log('admin login:', response.data);
        await AsyncStorage.setItem("auth", JSON.stringify(response.data));
        navigate("app", { state: { role: "admin" } });
      } else {
        Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Error logging in admin:', error);
      Alert.alert('Đăng nhập thất bại', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="content_login">
      <div className="login_form">
        <h3 class="custom-heading">Trang đăng nhập</h3>
        <Form
          className="col-md-10"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Bạn là"
            initialValue={role}
          >
            <Radio.Group onChange={onChangeRole}>
              <Radio value="student">Sinh viên</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
