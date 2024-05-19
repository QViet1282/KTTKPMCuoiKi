package vn.edu.iuh.fit.baitapck.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.baitapck.entities.Semester;
import vn.edu.iuh.fit.baitapck.repositories.SemesterRepository;
import vn.edu.iuh.fit.baitapck.service.SemesterService;

import java.util.List;
@Service
public class SemesterServiceImpl implements SemesterService {
    @Autowired
    private SemesterRepository semesterRepository;
    @Override
    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }
}
