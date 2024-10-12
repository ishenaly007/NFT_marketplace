package com.abit.backend.mapper;

import com.abit.backend.dto.NftTokenCreateDto;
import com.abit.backend.entity.NftToken;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

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
    }
}
