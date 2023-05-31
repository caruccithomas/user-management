package dev.carucci.fullstack_persona.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException (Integer id) {
        super("No se encontró ningún usuario con ID " + id);
    }
}
