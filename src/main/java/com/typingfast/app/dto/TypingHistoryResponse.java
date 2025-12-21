package com.typingfast.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class TypingHistoryResponse {
    private Long id;
    private int duration;
    private int totalChars;
    private int correctChars;
    private int errors;
    private double wpm;
    private double accuracy;
    private LocalDateTime createdAt;
}
