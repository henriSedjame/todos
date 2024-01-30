package io.github.legab86.todo.web;

import java.time.Duration;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.legab86.todo.models.TodoDto;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    
    @GetMapping
    public Flux<TodoDto> getAll(){
        return Flux.empty();
    }

    @PostMapping
    public Mono<TodoDto> create(){
        return Mono.empty();
    }

    @GetMapping
    public Mono<TodoDto> getById(){
        return Mono.empty();
    }

    
    public Mono<TodoDto> updateById(){
        return Mono.empty();
    }

    public Mono<TodoDto> deleteById(){
        return Mono.empty();
    }
    
}
