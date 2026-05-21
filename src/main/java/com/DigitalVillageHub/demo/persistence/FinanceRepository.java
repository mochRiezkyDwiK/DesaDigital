package com.DigitalVillageHub.demo.persistence;

import com.DigitalVillageHub.demo.model.entity.Finance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinanceRepository extends JpaRepository<Finance, Long> {
    List<Finance> findAllByOrderByIdDesc();
    List<Finance> findByType(String type);
    List<Finance> findByCategory(String category);
}