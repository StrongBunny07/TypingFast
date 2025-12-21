package com.typingfast.app.service;

import org.springframework.stereotype.Service;

@Service
public class TypingAnalysisService {
    public int calculateErrors(String original,String typed) {
        int errors = 0;
        int minLength = Math.min(original.length(), typed.length());

        for(int i = 0; i < minLength; i++) {
            if(original.charAt(i) != typed.charAt(i)) {
                errors++;
            }
        }

        errors += Math.abs(original.length() - typed.length());
        return errors;
    }

    public double calculateAccuracy(int correctChars, int totalTyped) {
        if(totalTyped == 0) return 0;
        return (double) correctChars / totalTyped * 100;
    }

    public double calculateWpm(int correctChars, int durationSeconds) {
        double minutes = durationSeconds / 60.0;
        return (correctChars/5.0) / minutes;
    }


}
