package com.abit.backend.database.repository;

import com.abit.backend.entity.NftToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<NftToken, Integer> {

}