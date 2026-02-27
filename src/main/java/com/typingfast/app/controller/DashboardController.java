package com.typingfast.app.controller;

import com.typingfast.app.dto.TypingHistoryResponse;
import com.typingfast.app.dto.UserProfileResponse;
import com.typingfast.app.dto.UserStatsResponse;
import com.typingfast.app.entity.User;
import com.typingfast.app.repository.UserRepository;
import com.typingfast.app.service.DashboardService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    public DashboardController(DashboardService dashboardService, UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
    }

    /**
     * Get current user's profile
     * GET /api/dashboard/profile
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        UserProfileResponse profile = dashboardService.getUserProfile(user);
        return ResponseEntity.ok(profile);
    }

    /**
     * Get detailed user statistics
     * GET /api/dashboard/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getStats(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        UserStatsResponse stats = dashboardService.getUserStats(user);
        return ResponseEntity.ok(stats);
    }

    /**
     * Get paginated typing history
     * GET /api/dashboard/history?page=0&size=10
     */
    @GetMapping("/history")
    public ResponseEntity<?> getHistory(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User user = getAuthenticatedUser(authentication);
        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        Page<TypingHistoryResponse> history = dashboardService.getTypingHistory(user, page, size);
        return ResponseEntity.ok(history);
    }

    /**
     * Get all typing history (no pagination)
     * GET /api/dashboard/history/all
     */
    @GetMapping("/history/all")
    public ResponseEntity<?> getAllHistory(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        List<TypingHistoryResponse> history = dashboardService.getAllTypingHistory(user);
        return ResponseEntity.ok(history);
    }

    /**
     * Helper method to get authenticated user
     */
    private User getAuthenticatedUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElse(null);
    }
}
