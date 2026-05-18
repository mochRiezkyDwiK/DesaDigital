package com.DigitalVillageHub.demo.repository;

import com.DigitalVillageHub.demo.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByUserId(Long userId);

    List<Report> findByStatus(String status);
}