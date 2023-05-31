package dev.carucci.fullstack_persona.controller;

import dev.carucci.fullstack_persona.exception.UserNotFoundException;
import dev.carucci.fullstack_persona.model.User;
import dev.carucci.fullstack_persona.repository.UserRepository;
import dev.carucci.fullstack_persona.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@CrossOrigin("*")
@RequestMapping("api/v1/user")
public class UserController {

    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    List<User> getUserProfiles() {
        return userService.getUserProfiles();
    }

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User updateUser (@RequestBody User newUser, @PathVariable Integer id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser (@PathVariable Integer id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "El usuario con ID " + id + " ha sido eliminado correctamente.";
    }

}
