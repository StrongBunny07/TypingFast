package com.typingfast.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    private Long userId;
    private String username;
    private String email;
    private String message;
}
