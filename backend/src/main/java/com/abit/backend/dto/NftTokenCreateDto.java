package com.abit.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;
import lombok.experimental.FieldNameConstants;

import java.time.LocalDateTime;

@Value
@FieldNameConstants
public class NftTokenCreateDto {
    @NotNull
    String name;
    Integer price;
    String author;
    LocalDateTime createdAt;
    LocalDateTime availableUntil;
}