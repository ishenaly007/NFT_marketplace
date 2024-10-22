//package com.abit.backend.IT;
//
//import com.abit.backend.annotation.IT;
//import com.abit.backend.database.repository.TokenRepository;
//import com.abit.backend.entity.NftToken;
//import lombok.RequiredArgsConstructor;
//import org.junit.jupiter.api.Test;
//import org.springframework.test.context.TestConstructor;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//@IT
//@RequiredArgsConstructor
//@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
//public class TokenRepositoryIT {
//    private final TokenRepository tokenRepository;
//
//    @Test
//    public void findAll() {
//        // Подготовка данных
//        NftToken token1 = new NftToken(1, "Token1", 100, "Author1", LocalDateTime.now(), null);
//        NftToken token2 = new NftToken(2, "Token2", 200, "Author2", LocalDateTime.now(), null);
//        tokenRepository.save(token1);
//        tokenRepository.save(token2);
//
//        // Действие
//        List<NftToken> tokens = tokenRepository.findAll();
//
//        // Проверка
//        assertEquals(2, tokens.size());
//        assertTrue(tokens.contains(token1));
//        assertTrue(tokens.contains(token2));
//    }
//}