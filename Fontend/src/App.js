import logo from './logo.svg';
import './App.css';
import Add_lesson from './Component/Add_subject'
import Add_classes from './Component/Add_classes'
import Login from './Component/Login'
import Header from './Layout/Header';
import { BrowserRouter, Link, Outlet, Route, Router, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [role, setRole] = useState('');
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (state && state.role) {
      setRole(state.role);
    }
  }, [state]);
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
                    <b>Huỳnh Duy Kha</b>
                  </h3>
                  <p>
                    <span>Giới tính: </span>
                    <span className="info-account-span">Nam</span>
                  </p>
                  <div>
                    <p>
                      <span>MSSV:</span>
                      <span className="info-account-span">19431331</span>
                    </p>
                  </div>
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
