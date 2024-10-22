package com.abit.backend.database.repository;

import com.abit.backend.entity.UserEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<UserEmail, Integer> {
}
