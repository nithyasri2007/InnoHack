package com.innohack.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innohack.backend.model.Hackathon;
import com.innohack.backend.service.HackathonService;

@RestController
@RequestMapping("/api/hackathons")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class HackathonController {

    @Autowired
    private HackathonService hackathonService;

    @GetMapping
    public List<Hackathon> getAllHackathons() {
        return hackathonService.getAllHackathons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hackathon> getHackathonById(@PathVariable Long id) {
        return hackathonService.getHackathonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/domain/{domain}")
    public List<Hackathon> getByDomain(@PathVariable String domain) {
        return hackathonService.getHackathonsByDomain(domain);
    }

    @GetMapping("/search")
    public List<Hackathon> search(@RequestParam String name) {
        return hackathonService.searchHackathons(name);
    }

    @PostMapping
    public Hackathon addHackathon(@RequestBody Hackathon hackathon) {
        return hackathonService.addHackathon(hackathon);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hackathon> updateHackathon(@PathVariable Long id, @RequestBody Hackathon hackathon) {
        return ResponseEntity.ok(hackathonService.updateHackathon(id, hackathon));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHackathon(@PathVariable Long id) {
        hackathonService.deleteHackathon(id);
        return ResponseEntity.noContent().build();
    }
}
