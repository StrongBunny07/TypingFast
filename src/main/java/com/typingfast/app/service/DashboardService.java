package com.typingfast.app.service;

import com.typingfast.app.dto.TypingHistoryResponse;
import com.typingfast.app.dto.UserProfileResponse;
import com.typingfast.app.dto.UserStatsResponse;
import com.typingfast.app.entity.TypingResult;
import com.typingfast.app.entity.User;
import com.typingfast.app.repository.TypingResultRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TypingResultRepository typingResultRepository;

    public DashboardService(TypingResultRepository typingResultRepository) {
        this.typingResultRepository = typingResultRepository;
    }

    /**
     * Get user profile with basic stats
     */
    public UserProfileResponse getUserProfile(User user) {
        int totalTests = typingResultRepository.countByUser(user);
        double bestWpm = typingResultRepository.findBestWpmByUser(user).orElse(0.0);
        double bestAccuracy = typingResultRepository.findBestAccuracyByUser(user).orElse(0.0);

        return UserProfileResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .totalTests(totalTests)
                .bestWpm(Math.round(bestWpm * 100.0) / 100.0)
                .bestAccuracy(Math.round(bestAccuracy * 100.0) / 100.0)
                .build();
    }

    /**
     * Get detailed statistics for the user
     */
    public UserStatsResponse getUserStats(User user) {
        int totalTests = typingResultRepository.countByUser(user);

        // If no tests, return zeros
        if (totalTests == 0) {
            return UserStatsResponse.builder()
                    .bestWpm(0.0)
                    .bestAccuracy(0.0)
                    .averageWpm(0.0)
                    .averageAccuracy(0.0)
                    .totalTests(0)
                    .totalTimeSeconds(0)
                    .totalCharactersTyped(0)
                    .totalErrors(0)
                    .recentAverageWpm(0.0)
                    .recentAverageAccuracy(0.0)
                    .build();
        }

        double bestWpm = typingResultRepository.findBestWpmByUser(user).orElse(0.0);
        double bestAccuracy = typingResultRepository.findBestAccuracyByUser(user).orElse(0.0);
        double avgWpm = typingResultRepository.findAverageWpmByUser(user).orElse(0.0);
        double avgAccuracy = typingResultRepository.findAverageAccuracyByUser(user).orElse(0.0);
        int totalDuration = typingResultRepository.findTotalDurationByUser(user);
        int totalChars = typingResultRepository.findTotalCharsByUser(user);
        int totalErrors = typingResultRepository.findTotalErrorsByUser(user);

        // Calculate recent trend (last 10 tests)
        List<TypingResult> recentTests = typingResultRepository.findTop10ByUserOrderByCreatedAtDesc(user);
        double recentAvgWpm = recentTests.stream()
                .mapToDouble(TypingResult::getWpm)
                .average()
                .orElse(0.0);
        double recentAvgAccuracy = recentTests.stream()
                .mapToDouble(TypingResult::getAccuracy)
                .average()
                .orElse(0.0);

        return UserStatsResponse.builder()
                .bestWpm(Math.round(bestWpm * 100.0) / 100.0)
                .bestAccuracy(Math.round(bestAccuracy * 100.0) / 100.0)
                .averageWpm(Math.round(avgWpm * 100.0) / 100.0)
                .averageAccuracy(Math.round(avgAccuracy * 100.0) / 100.0)
                .totalTests(totalTests)
                .totalTimeSeconds(totalDuration)
                .totalCharactersTyped(totalChars)
                .totalErrors(totalErrors)
                .recentAverageWpm(Math.round(recentAvgWpm * 100.0) / 100.0)
                .recentAverageAccuracy(Math.round(recentAvgAccuracy * 100.0) / 100.0)
                .build();
    }

    /**
     * Get paginated typing history
     */
    public Page<TypingHistoryResponse> getTypingHistory(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TypingResult> results = typingResultRepository.findByUserOrderByCreatedAtDesc(user, pageable);

        return results.map(this::mapToHistoryResponse);
    }

    /**
     * Get all typing history (no pagination)
     */
    public List<TypingHistoryResponse> getAllTypingHistory(User user) {
        List<TypingResult> results = typingResultRepository.findByUserOrderByCreatedAtDesc(user);
        return results.stream()
                .map(this::mapToHistoryResponse)
                .collect(Collectors.toList());
    }

    /**
     * Map entity to DTO
     */
    private TypingHistoryResponse mapToHistoryResponse(TypingResult result) {
        return TypingHistoryResponse.builder()
                .id(result.getId())
                .duration(result.getDuration())
                .totalChars(result.getTotalChars())
                .correctChars(result.getCorrectChars())
                .errors(result.getErrors())
                .wpm(Math.round(result.getWpm() * 100.0) / 100.0)
                .accuracy(Math.round(result.getAccuracy() * 100.0) / 100.0)
                .createdAt(result.getCreatedAt())
                .build();
    }
}
