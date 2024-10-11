package com.abit.backend.http.controller;

import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tokens")
@CrossOrigin(origins = "http://localhost:5173")
public class TokenRestController {
    private final TokenService service;

    @PreAuthorize("permitAll()")
    @GetMapping
    public List<NftTokenDto> getTokens() {
        return service.findAll();
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/{id}")
    public NftTokenDto getTokenById(@PathVariable("id") Integer id) {
        System.out.println("Получен запрос на ID: " + id);  // Логируем полученный ID
        return service.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Токен с ID " + id + " не найден"));
    }

}