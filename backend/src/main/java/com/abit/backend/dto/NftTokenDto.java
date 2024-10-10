package com.abit.backend.dto;

import lombok.Value;

import java.time.LocalDateTime;

@Value
public class NftTokenDto {
    Integer id;
    String name;
    Integer price;
    String author;
    LocalDateTime createdAt;
    LocalDateTime availableUntil;
}