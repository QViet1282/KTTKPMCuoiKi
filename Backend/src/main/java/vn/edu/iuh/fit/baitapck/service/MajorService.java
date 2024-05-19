package vn.edu.iuh.fit.baitapck.service;

import vn.edu.iuh.fit.baitapck.entities.Department;
import vn.edu.iuh.fit.baitapck.entities.Major;

import java.util.List;

public interface MajorService {
    List<Major> findAllByDepartmentId(Long departmentId);
}
