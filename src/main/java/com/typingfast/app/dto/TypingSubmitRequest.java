package com.typingfast.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class TypingSubmitRequest {

    @NotBlank
    private String originalText;

    @NotBlank
    private String typedText;

    @NotNull
    private Integer duration;
}
