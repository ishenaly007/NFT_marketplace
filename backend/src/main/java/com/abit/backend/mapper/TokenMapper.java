package com.abit.backend.mapper;

import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.entity.NftToken;
import org.springframework.stereotype.Component;

@Component
public class TokenMapper implements Mapper<NftToken, NftTokenDto> {
    @Override
    public NftTokenDto map(NftToken from) {
        return new NftTokenDto(from.getId(),
                from.getName(),
                from.getPrice(),
                from.getAuthor(),
                from.getCreatedAt(),
                from.getAvailableUntil());
    }
}