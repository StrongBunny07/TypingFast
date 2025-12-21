package com.typingfast.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserStatsResponse {
    // Best performances
    private double bestWpm;
    private double bestAccuracy;

    // Averages
    private double averageWpm;
    private double averageAccuracy;

    // Totals
    private int totalTests;
    private int totalTimeSeconds;
    private int totalCharactersTyped;
    private int totalErrors;

    // Recent trend (last 10 tests average)
    private double recentAverageWpm;
    private double recentAverageAccuracy;
}
