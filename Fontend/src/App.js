import logo from './logo.svg';
import './App.css';
import Add_lesson from './Component/Add_subject'
import Add_classes from './Component/Add_classes'
import Login from './Component/Login'
import Header from './Layout/Header';
import { BrowserRouter, Link, Outlet, Route, Router, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [role, setRole] = useState('');
  const location = useLocation();
  const { state } = location;
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [studentNumber, setStudentNumber] = useState("")
  const [major, setMajor] = useState("")
  
  useEffect(() => {
    // Kiểm tra xem dữ liệu từ AsyncStorage đã tồn tại chưa
    const fetchUserData = async () => {
      const userString = await AsyncStorage.getItem("auth");
      if (!userString) return; // Nếu không tồn tại, bỏ qua
      const user = JSON.parse(userString);
      const name = user.name;
      const gender = user.gender;
      setName(name);
      setGender(gender);
      console.log(user);
      if (role === 'student') {
        const studentNumber = user.studentCode;
        const major = user.major.majorN
        setStudentNumber(studentNumber);
        setMajor(major);
      }
    };
  
    fetchUserData();
  }, []);
  useEffect(() => {
    if (state && state.role) {
      setRole(state.role);

    }
    if (role)
      fetchUser();
  }, [state, role]);

  const fetchUser = async () => {
    const userString = await AsyncStorage.getItem("auth");
    const user = JSON.parse(userString);
    const name = user.name;
    const gender = user.gender;

    setName(name)
    setGender(gender)
    console.log(user);
    if (role === 'student') {
      const studentNumber = user.studentCode;
      const major = user.major.majorName;

      setStudentNumber(studentNumber)
      setMajor(major)
    }
  };
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="row w-auto">
          <div className="col-md-4 ">
            <div className="row">
              <div className="col-md-7 w-auto">
                <div className="info">
                  <p>Xin chào</p>
                  <h3>
                    <b>{name}</b>
                  </h3>
                  <p>
                    <span>Giới tính: </span>
                    <span className="info-account-span">{gender}</span>
                  </p>
                  {role === 'student' && (
                    <div>
                      <p>
                        <span>MSSV: </span>
                        <span className="info-account-span">{studentNumber}</span>
                      </p>
                      <p>
                        <span>Ngành: </span>
                        <span className="info-account-span">{major}</span>
                      </p>
                    </div>
                  )}

                  <button type="button" className="btn btn-warning">
                    <Link to="/">Đăng xuất</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6 w-auto">
                  {role === 'admin' && (
                    <>
                      {/* <p>
                        <Link to="/app/add_classes">THÊM LỚP HỌC PHẦN</Link>
                      </p> */}
                      <p>
                        <Link to="/app/add_lesson">THÊM LỚP MÔN HỌC PHẦN</Link>
                      </p>
                    </>
                  )}
                  {role === 'student' && (
                    <p>
                      <Link to="/app/register_subject">ĐĂNG KÝ HỌC PHẦN</Link>
                    </p>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
