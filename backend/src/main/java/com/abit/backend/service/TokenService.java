package com.abit.backend.service;

import com.abit.backend.database.repository.TokenRepository;
import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.mapper.TokenMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    private final TokenMapper mapper;

    public List<NftTokenDto> findAll() {
        return tokenRepository.findAll().stream().map(mapper::map).toList();
    }

    public Optional<NftTokenDto> findById(Integer id) {
        return tokenRepository.findById(id)
                .map(mapper::map);
    }
}