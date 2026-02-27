package com.typingfast.app.controller;

import com.typingfast.app.dto.TypingSubmitRequest;
import com.typingfast.app.entity.User;
import com.typingfast.app.entity.TypingResult;
import com.typingfast.app.repository.UserRepository;
import com.typingfast.app.repository.TypingResultRepository;
import com.typingfast.app.service.TypingAnalysisService;
import com.typingfast.app.service.TypingTextService;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/typing")
@CrossOrigin(origins = "*")
public class TypingController {

    private final TypingTextService textService;
    private final TypingAnalysisService analysisService;
    private final TypingResultRepository typingResultRepository;
    private final UserRepository userRepository;

    public TypingController(
            TypingTextService textService,
            TypingAnalysisService analysisService,
            TypingResultRepository typingResultRepository,
            UserRepository userRepository
    ) {
        this.textService = textService;
        this.analysisService = analysisService;
        this.typingResultRepository = typingResultRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/text")
    public Map<String, String> getTypingText(
            @RequestParam(defaultValue = "50") int words
    ) {
        String text = textService.generatedText(words);
        return Map.of("text", text);
    }

    @PostMapping("/submit")
    public Map<String, Object> submitTyping(
            @Valid @RequestBody TypingSubmitRequest request,
            Authentication authentication
    ) {
        String original = request.getOriginalText();
        String typed = request.getTypedText();

        int totalTyped = typed.length();
        int errors = analysisService.calculateErrors(original, typed);
        int correctedChars = Math.max(totalTyped - errors, 0);

        double accuracy = analysisService.calculateAccuracy(correctedChars, totalTyped);
        double wpm = analysisService.calculateWpm(correctedChars, request.getDuration());

        Map<String, Object> response = new HashMap<>();
        response.put("wpm", wpm);
        response.put("accuracy", accuracy);
        response.put("errors", errors);
        response.put("correctedChars", correctedChars);

        if(authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username).orElse(null);

            if(user != null) {
                TypingResult result = TypingResult.builder()
                        .user(user)
                        .duration(request.getDuration())
                        .totalChars(totalTyped)
                        .correctChars(correctedChars)
                        .errors(errors)
                        .wpm(wpm)
                        .accuracy(accuracy)
                        .build();

                typingResultRepository.save(result);
            }
        }

        return response;
    }
}
