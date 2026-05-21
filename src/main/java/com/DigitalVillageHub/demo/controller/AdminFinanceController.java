package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.model.entity.Finance;
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
        return ResponseEntity.status(201).body(Map.of(
                "success", true,
                "message", "Transaksi berhasil ditambahkan",
                "data", adminFinanceService.createTransaction(finance)
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(
            @PathVariable Long id,
            @RequestBody Finance finance
    ) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Transaksi berhasil diperbarui",
                "data", adminFinanceService.updateTransaction(id, finance)
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        adminFinanceService.deleteTransaction(id);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Transaksi berhasil dihapus"
        ));
    }
}