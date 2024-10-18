package com.abit.backend.dto;

import lombok.Value;
import lombok.experimental.FieldNameConstants;

import java.time.LocalDateTime;

@Value
@FieldNameConstants
public class NftTokenDto {
    Integer id;
    String name;
    Integer price;
    String author;
    LocalDateTime createdAt;
    LocalDateTime availableUntil;
    String imageUrl;
}