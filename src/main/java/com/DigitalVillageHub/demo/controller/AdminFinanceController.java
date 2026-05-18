package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.entity.Finance;
import com.DigitalVillageHub.demo.service.AdminFinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/finance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminFinanceController {

    private final AdminFinanceService adminFinanceService;

    @GetMapping
    public ResponseEntity<?> getFinanceSummary() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", adminFinanceService.getFinanceSummary()
        ));
    }

    @GetMapping("/transactions")
    public ResponseEntity<?> getAllTransactions() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", adminFinanceService.getAllTransactions()
        ));
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody Finance finance) {
        try {
            return ResponseEntity.status(201).body(Map.of(
                    "success", true,
                    "message", "Transaksi berhasil ditambahkan",
                    "data", adminFinanceService.createTransaction(finance)
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(
            @PathVariable Long id,
            @RequestBody Finance finance
    ) {
        try {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Transaksi berhasil diperbarui",
                    "data", adminFinanceService.updateTransaction(id, finance)
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        try {
            adminFinanceService.deleteTransaction(id);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Transaksi berhasil dihapus"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}