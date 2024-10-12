package com.abit.backend.service;

import com.abit.backend.database.repository.TokenRepository;
import com.abit.backend.dto.NftTokenCreateDto;
import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.mapper.TokenCreateMapper;
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
    private final TokenMapper readMapper;
    private final TokenCreateMapper createMapper;

    public List<NftTokenDto> findAll() {
        return tokenRepository.findAll().stream().map(readMapper::map).toList();
    }

    public Optional<NftTokenDto> findById(Integer id) {
        return tokenRepository.findById(id)
                .map(readMapper::map);
    }

    @Transactional
    public NftTokenDto create(NftTokenCreateDto dto) {
        tokenRepository.save(createMapper.map(dto));
        return readMapper.map(createMapper.map(dto));
    }
}