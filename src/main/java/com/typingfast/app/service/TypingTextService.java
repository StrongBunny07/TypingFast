package com.typingfast.app.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TypingTextService {
    private static final List<String> WORDS =  List.of(
            "java", "spring", "boot", "typing", "keyboard", "developer", "backend", "frontend", "api", "database", "mysql", "security", "performance", "accuracy", "speed", "session", "request", "response", "controller", "service", "repository", "model", "entity", "mapping", "config", "filter", "token", "auth", "login", "user", "profile", "score", "timer", "streak", "input", "output", "client", "server", "json", "rest", "http", "status", "error", "valid", "logic", "code", "syntax", "array", "string", "object", "class", "method", "variable", "stream", "lambda", "async", "thread", "memory", "cache", "query", "index", "join", "table", "schema", "test", "junit", "mock", "build", "maven", "gradle", "docker", "cloud", "deploy", "git", "commit", "push", "pull", "merge", "branch", "logic", "random", "word", "char", "key", "press", "event", "hook", "state", "effect", "react", "style", "css", "html", "script", "node", "npm", "package", "dependency", "injection", "bean", "context", "scope", "proxy", "aspect", "logger", "debug", "trace", "metric", "monitor", "latency", "bandwidth", "storage", "cluster", "node", "packet", "header", "cookie", "payload", "secret", "crypto", "hash", "salt", "bcrypt", "jwt", "oauth", "claim", "role", "admin", "access", "permit", "deny", "cors", "csrf", "header", "params", "body", "patch", "delete", "post", "get", "put", "update", "save", "find", "list", "page", "sort", "limit", "offset", "count", "sum", "average", "rank", "level"
    );

    public String generatedText(int wordCount) {
        Random random = new Random();

        return random.ints(wordCount, 0, WORDS.size())
                .mapToObj(WORDS::get)
                .collect(Collectors.joining(" "));
    }
}
