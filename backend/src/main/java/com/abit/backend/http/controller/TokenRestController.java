package com.abit.backend.http.controller;

import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tokens")
public class TokenRestController {
    private final TokenService service;

    @GetMapping
    public List<NftTokenDto> getTokens() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public NftTokenDto getTokenById(@PathVariable("id") Integer id) {
        System.out.println("Получен запрос на ID: " + id);  // Логируем полученный ID
        return service.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Токен с ID " + id + " не найден"));
    }

}