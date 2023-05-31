package dev.carucci.fullstack_persona.repository;

import dev.carucci.fullstack_persona.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {}