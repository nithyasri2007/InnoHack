package com.innohack.backend.repository;

import com.innohack.backend.model.Hackathon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HackathonRepository extends JpaRepository<Hackathon, Long> {
    List<Hackathon> findByDomain(String domain);
    List<Hackathon> findByNameContainingIgnoreCase(String name);
}
