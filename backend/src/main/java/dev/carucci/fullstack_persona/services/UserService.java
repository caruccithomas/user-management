package dev.carucci.fullstack_persona.services;

import dev.carucci.fullstack_persona.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

	private final UserDataAccessService userDataAccessService;

	@Autowired
	public UserService(UserDataAccessService userDataAccessService) {
		this.userDataAccessService = userDataAccessService;
	}

	public List<User> getUserProfiles() {
		return userDataAccessService.getUserProfiles();
	}

}
