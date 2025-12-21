package com.typingfast.app.repository;

import com.typingfast.app.entity.TypingResult;
import com.typingfast.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {
    List<TypingResult> findByUserOrderByCreatedAtDesc(User user);
}
