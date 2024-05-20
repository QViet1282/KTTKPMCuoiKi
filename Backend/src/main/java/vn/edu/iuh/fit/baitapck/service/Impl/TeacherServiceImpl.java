package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.entities.Teacher;
import vn.edu.iuh.fit.baitapck.repositories.TeacherRepository;
import vn.edu.iuh.fit.baitapck.service.TeacherService;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    public List<Teacher> findByDepartmentDepartmentId(Long departmentId){
        return teacherRepository.findByDepartmentDepartmentId(departmentId);
    }
}
