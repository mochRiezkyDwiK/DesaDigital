package com.DigitalVillageHub.demo.service;

import com.DigitalVillageHub.demo.entity.Finance;
import com.DigitalVillageHub.demo.repository.FinanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminFinanceService {

    private final FinanceRepository financeRepository;

    public Map<String, Object> getFinanceSummary() {
        List<Finance> transactions = financeRepository.findAllByOrderByIdDesc();

        BigDecimal income = transactions.stream()
                .filter(f -> "INCOME".equalsIgnoreCase(f.getType()))
                .map(Finance::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal expense = transactions.stream()
                .filter(f -> "EXPENSE".equalsIgnoreCase(f.getType()))
                .map(Finance::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balance = income.subtract(expense);

        return Map.of(
                "income", income,
                "expense", expense,
                "balance", balance,
                "transactions", transactions
        );
    }

    public List<Finance> getAllTransactions() {
        return financeRepository.findAllByOrderByIdDesc();
    }

    public Finance createTransaction(Finance finance) {
        if (finance.getTransactionDate() == null) {
            finance.setTransactionDate(LocalDate.now());
        }

        if (finance.getCurrentBalance() == null) {
            finance.setCurrentBalance(BigDecimal.ZERO);
        }

        return financeRepository.save(finance);
    }

    public Finance updateTransaction(Long id, Finance request) {
        Finance finance = financeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data keuangan tidak ditemukan"));

        finance.setTitle(request.getTitle());
        finance.setType(request.getType());
        finance.setAmount(request.getAmount());
        finance.setCategory(request.getCategory());
        finance.setRecipient(request.getRecipient());
        finance.setEvidenceUrl(request.getEvidenceUrl());
        finance.setCurrentBalance(request.getCurrentBalance());
        finance.setTransactionDate(request.getTransactionDate());

        return financeRepository.save(finance);
    }

    public void deleteTransaction(Long id) {
        Finance finance = financeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data keuangan tidak ditemukan"));

        financeRepository.delete(finance);
    }
}