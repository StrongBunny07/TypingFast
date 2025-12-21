package com.typingfast.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    private int totalTests;
    private double bestWpm;
    private double bestAccuracy;
}
