package io.github.legab86.todo.models;

public record TodoDto(
    String id,
    String label,
    boolean completed
) {}
