package io.github.legab86.todo.models;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("Todos")
public record TodoEntity(
    @Id UUID id,
    String label,
    boolean completed
) {
    
}
