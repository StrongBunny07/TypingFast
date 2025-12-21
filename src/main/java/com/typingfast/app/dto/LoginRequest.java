package com.typingfast.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class LoginRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
