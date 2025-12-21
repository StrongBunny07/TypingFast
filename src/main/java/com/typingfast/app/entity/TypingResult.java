package com.typingfast.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "typing_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class TypingResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Many results to one User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private int totalChars;

    @Column(nullable = false)
    private int correctChars;

    @Column(nullable = false)
    private int errors;

    @Column(nullable = false)
    private double wpm;

    @Column(nullable = false)
    private double accuracy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
