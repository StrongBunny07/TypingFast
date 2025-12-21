package com.typingfast.app.repository;

import com.typingfast.app.entity.TypingResult;
import com.typingfast.app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {

    // Get all results for a user, ordered by date (newest first)
    List<TypingResult> findByUserOrderByCreatedAtDesc(User user);

    // Paginated results for history
    Page<TypingResult> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    // Count total tests by user
    int countByUser(User user);

    // Get best WPM for a user
    @Query("SELECT MAX(t.wpm) FROM TypingResult t WHERE t.user = :user")
    Optional<Double> findBestWpmByUser(@Param("user") User user);

    // Get best accuracy for a user
    @Query("SELECT MAX(t.accuracy) FROM TypingResult t WHERE t.user = :user")
    Optional<Double> findBestAccuracyByUser(@Param("user") User user);

    // Get average WPM for a user
    @Query("SELECT AVG(t.wpm) FROM TypingResult t WHERE t.user = :user")
    Optional<Double> findAverageWpmByUser(@Param("user") User user);

    // Get average accuracy for a user
    @Query("SELECT AVG(t.accuracy) FROM TypingResult t WHERE t.user = :user")
    Optional<Double> findAverageAccuracyByUser(@Param("user") User user);

    // Get total time practiced (sum of durations)
    @Query("SELECT COALESCE(SUM(t.duration), 0) FROM TypingResult t WHERE t.user = :user")
    int findTotalDurationByUser(@Param("user") User user);

    // Get total characters typed
    @Query("SELECT COALESCE(SUM(t.totalChars), 0) FROM TypingResult t WHERE t.user = :user")
    int findTotalCharsByUser(@Param("user") User user);

    // Get total errors
    @Query("SELECT COALESCE(SUM(t.errors), 0) FROM TypingResult t WHERE t.user = :user")
    int findTotalErrorsByUser(@Param("user") User user);

    // Get recent N tests for trend analysis
    List<TypingResult> findTop10ByUserOrderByCreatedAtDesc(User user);
}
