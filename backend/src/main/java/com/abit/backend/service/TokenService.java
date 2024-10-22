package com.abit.backend.service;

import com.abit.backend.database.repository.TokenRepository;
import com.abit.backend.dto.NftTokenCreateDto;
import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.entity.NftToken;
import com.abit.backend.mapper.TokenCreateMapper;
import com.abit.backend.mapper.TokenMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    private final TokenMapper readMapper;
    private final TokenCreateMapper createMapper;
    private final ImageService imageService;

    public List<NftTokenDto> findAll() {
        return tokenRepository.findAll().stream().map(readMapper::map).toList();
    }

    public Optional<NftTokenDto> findById(Integer id) {
        return tokenRepository.findById(id)
                .map(readMapper::map);
    }

    @Transactional
    public NftTokenDto create(NftTokenCreateDto dto) {
        NftToken nftToken = createMapper.map(dto);
        uploadImage(dto.getImage());
        tokenRepository.save(nftToken);
        return readMapper.map(nftToken);
    }

    public Optional<byte[]> getImage(Integer id) {
        return tokenRepository.findById(id)
                .map(NftToken::getImageUrl)
                .filter(StringUtils::hasText)
                .flatMap(imageService::getImage);
    }

    @SneakyThrows
    private void uploadImage(MultipartFile image) {
        if (!image.isEmpty()) {
            imageService.uploadImage(image.getOriginalFilename(), image.getInputStream());
        }
    }
}