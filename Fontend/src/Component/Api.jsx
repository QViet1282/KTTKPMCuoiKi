import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function Abc() {
    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [majors, setMajors] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [majorCourses, setMajorCourses] = useState([]);
    const [semesterCourses, setSemesterCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [waitingCourses, setWaitingCourses] = useState([]);

    useEffect(() => {
        fetchAllData();
        loginStudent();
        loginAdmin();
    }, []);

    const fetchAllData = async () => {
        try {
            const departmentsResponse = await axios.get('http://localhost:8080/department/all');
            setDepartments(departmentsResponse.data);
            console.log('Departments:', departmentsResponse.data);

            const semestersResponse = await axios.get('http://localhost:8080/semester/all');
            setSemesters(semestersResponse.data);
            console.log('Semesters:', semestersResponse.data);

            const majorsResponse = await axios.get('http://localhost:8080/major/all/departmentId?departmentId=1');
            setMajors(majorsResponse.data);
            console.log('Majors:', majorsResponse.data);

            const selectedCoursesResponse = await axios.get('http://localhost:8080/semester-course/selected-courses?majorId=1&semesterId=1');
            setSelectedCourses(selectedCoursesResponse.data);
            console.log('Selected Courses:', selectedCoursesResponse.data);

            // const majorCoursesResponse = await axios.get(`http://localhost:8080/course/all/majorId?majorId=${}`);
            // setMajorCourses(majorCoursesResponse.data);
            // console.log('Major Courses:', majorCoursesResponse.data);

            const semesterCoursesResponse = await axios.get('http://localhost:8080/course-class/find-by-semester-course-id?semesterCourseId=1');
            setSemesterCourses(semesterCoursesResponse.data);
            console.log('Semester Courses:', semesterCoursesResponse.data);

            const availableCoursesResponse = await axios.get('http://localhost:8080/course/available-courses?studentId=1');
            setAvailableCourses(availableCoursesResponse.data);
            console.log('Available Courses:', availableCoursesResponse.data);

            const registeredCoursesResponse = await axios.get('http://localhost:8080/course/student/enrolled-courses?studentId=1&semesterId=1');
            setRegisteredCourses(registeredCoursesResponse.data);
            console.log('Registered Courses:', registeredCoursesResponse.data);

            const waitingCoursesResponse = await axios.get('http://localhost:8080/course/student/wait-list-courses?studentId=3');
            setWaitingCourses(waitingCoursesResponse.data);
            console.log('Waiting Courses:', waitingCoursesResponse.data);

        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    const loginStudent = async () => {
        try {
            const response = await axios.post('http://localhost:8080/student/login', {
                // Cấu trúc dữ liệu của Department tùy theo API
                studentCode: 'SV001',
                password:'123'
            });
            console.log('studentlogin',response.data);
        } catch (error) {
            console.error('Error adding department', error);
        }
    };
    const loginAdmin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin/login', {
                // Cấu trúc dữ liệu của Department tùy theo API
                adminCode: 'ADM001',
                password:'123'
            });
            console.log('adminlogin',response.data);
        } catch (error) {
            console.error('Error adding department', error);
        }
    };
    return (
        <div>
            <h1>Danh sách khoa</h1>
            
        </div>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         // justifyContent: 'center',
//         gap: 10
//     }
// });
