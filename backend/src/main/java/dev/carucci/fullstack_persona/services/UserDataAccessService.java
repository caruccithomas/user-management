package dev.carucci.fullstack_persona.services;

import dev.carucci.fullstack_persona.datastore.FakeUserDataStore;
import dev.carucci.fullstack_persona.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDataAccessService {
	private final FakeUserDataStore fakeUserDataStore;

	@Autowired
	public UserDataAccessService(FakeUserDataStore fakeUserDataStore) {
		this.fakeUserDataStore = fakeUserDataStore;
	}

	List<User> getUserProfiles() {
		return fakeUserDataStore.getUserProfiles();
	}
}
