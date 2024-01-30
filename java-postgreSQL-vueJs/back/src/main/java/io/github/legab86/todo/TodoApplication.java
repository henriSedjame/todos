package io.github.legab86.todo;

import java.time.Duration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import reactor.core.publisher.Mono;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		 SpringApplication.run(TodoApplication.class, args);
	}

}
