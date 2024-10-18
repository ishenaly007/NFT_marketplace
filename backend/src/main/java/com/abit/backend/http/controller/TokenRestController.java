package com.abit.backend.http.controller;

import com.abit.backend.dto.NftTokenCreateDto;
import com.abit.backend.dto.NftTokenDto;
import com.abit.backend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.ResponseEntity.notFound;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tokens")
@CrossOrigin(origins = "http://localhost:5173")
public class TokenRestController {
    private final TokenService service;

    //    @PreAuthorize("permitAll()")
//    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseStatus(HttpStatus.CREATED)
//    public NftTokenDto createToken(@Validated @RequestBody NftTokenCreateDto dto) {
//        return service.create(dto);
//    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public NftTokenDto createToken(
            @RequestParam("name") String name,
            @RequestParam("price") String price,
            @RequestParam("author") String author,
            @RequestParam("availableUntil") String availableUntil,
            @RequestParam("image") MultipartFile imageFile) {

        NftTokenCreateDto dto = new NftTokenCreateDto(name, Integer.parseInt(price), author, LocalDateTime.now(), LocalDateTime.parse(availableUntil), imageFile);
        return service.create(dto);
    }

    @PreAuthorize("permitAll()")
    @GetMapping(value = "/{id}/image")
    public ResponseEntity<byte[]> findImage(@PathVariable("id") Integer id) {
        return service.getImage(id)
                .map(content -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE)
                        .contentLength(content.length)
                        .body(content))
                .orElseGet(notFound()::build);
    }

    @PreAuthorize("permitAll()")
    @GetMapping
    public List<NftTokenDto> getTokens() {
        return service.findAll();
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/{id}")
    public NftTokenDto getTokenById(@PathVariable("id") Integer id) {
        System.out.println("Получен запрос на ID: " + id);  // Логируем полученный ID
        return service.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Токен с ID " + id + " не найден"));
    }
}