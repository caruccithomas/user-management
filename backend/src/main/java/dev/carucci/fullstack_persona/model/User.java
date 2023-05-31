package dev.carucci.fullstack_persona.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;
import java.util.Optional;

@Entity
public class User {

    @Id
    @GeneratedValue
    private Integer id;
    private String username;
    private String name;
    private String email;
    private String profileImg; // KEY S3 (AWS)

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Optional <String> getProfileImg() {
        return Optional.ofNullable(profileImg);
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public User(){}

    public User(Integer id, String username, String name, String email, String profileImg) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.profileImg = profileImg;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User that = (User) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(username, that.username) &&
                Objects.equals(name, that.name) &&
                Objects.equals(email, that.email) &&
                Objects.equals(profileImg, that.profileImg);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, name, email, profileImg);
    }
}
