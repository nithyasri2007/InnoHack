package com.innohack.backend.service;

import com.innohack.backend.model.Application;
import com.innohack.backend.model.Hackathon;
import com.innohack.backend.model.User;
import com.innohack.backend.repository.ApplicationRepository;
import com.innohack.backend.repository.HackathonRepository;
import com.innohack.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HackathonRepository hackathonRepository;

    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    public Application applyToHackathon(Long userId, Long hackathonId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Hackathon hackathon = hackathonRepository.findById(hackathonId)
                .orElseThrow(() -> new RuntimeException("Hackathon not found"));

        Application application = new Application();
        application.setUser(user);
        application.setHackathon(hackathon);
        application.setStatus("Applied");
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}
