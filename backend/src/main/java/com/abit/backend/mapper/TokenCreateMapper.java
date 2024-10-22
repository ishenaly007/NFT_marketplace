package com.abit.backend.mapper;

import com.abit.backend.dto.NftTokenCreateDto;
import com.abit.backend.entity.NftToken;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.function.Predicate;

@Component
public class TokenCreateMapper implements Mapper<NftTokenCreateDto, NftToken> {

    @Override
    public NftToken map(NftTokenCreateDto from) {
        NftToken nftToken = new NftToken();
        copy(from, nftToken);
        return nftToken;
    }

    private void copy(NftTokenCreateDto createDto, NftToken nftToken) {
        nftToken.setName(createDto.getName());
        nftToken.setPrice(createDto.getPrice());
        nftToken.setAuthor(createDto.getAuthor());
        nftToken.setCreatedAt(LocalDateTime.now());
        nftToken.setAvailableUntil(createDto.getAvailableUntil());
        Optional.ofNullable(createDto.getImage())
                .filter(Predicate.not(MultipartFile::isEmpty))
                .ifPresent(image -> nftToken.setImageUrl(image.getOriginalFilename()));
    }
}