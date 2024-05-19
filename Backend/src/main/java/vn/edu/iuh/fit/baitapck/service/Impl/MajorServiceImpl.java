package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.entities.Department;
import vn.edu.iuh.fit.baitapck.entities.Major;
import vn.edu.iuh.fit.baitapck.repositories.MajorRepository;
import vn.edu.iuh.fit.baitapck.service.MajorService;

import java.util.List;
@Service
public class MajorServiceImpl implements MajorService {

    @Autowired
    private MajorRepository majorRepository;
    @Override
    public List<Major> findAllByDepartmentId(Long departmentId) {
        return majorRepository.findAllByDepartmentDepartmentId(departmentId);
    }
}
