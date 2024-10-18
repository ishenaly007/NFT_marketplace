package com.abit.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldNameConstants;
import org.springframework.web.multipart.MultipartFile;

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
    MultipartFile image;
}