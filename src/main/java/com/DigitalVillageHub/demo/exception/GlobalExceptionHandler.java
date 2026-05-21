package com.DigitalVillageHub.demo.exception;

import com.DigitalVillageHub.demo.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.builder()
                .success(false)
                .message(e.getMessage())
                .data(null)
                .build());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequest(BadRequestException e) {
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .success(false)
                .message(e.getMessage())
                .data(null)
                .build());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntime(RuntimeException e) {
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .success(false)
                .message(e.getMessage())
                .data(null)
                .build());
    }
}
