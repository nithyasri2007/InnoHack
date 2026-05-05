package com.innohack.backend.service;

import com.innohack.backend.model.Hackathon;
import com.innohack.backend.repository.HackathonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HackathonService {

    @Autowired
    private HackathonRepository hackathonRepository;

    public List<Hackathon> getAllHackathons() {
        return hackathonRepository.findAll();
    }

    public Optional<Hackathon> getHackathonById(Long id) {
        return hackathonRepository.findById(id);
    }

    public List<Hackathon> getHackathonsByDomain(String domain) {
        return hackathonRepository.findByDomain(domain);
    }

    public List<Hackathon> searchHackathons(String name) {
        return hackathonRepository.findByNameContainingIgnoreCase(name);
    }

    public Hackathon addHackathon(Hackathon hackathon) {
        return hackathonRepository.save(hackathon);
    }

    public Hackathon updateHackathon(Long id, Hackathon hackathon) {
        hackathon.setId(id);
        return hackathonRepository.save(hackathon);
    }

    public void deleteHackathon(Long id) {
        hackathonRepository.deleteById(id);
    }
}
