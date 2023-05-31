package dev.carucci.fullstack_persona.datastore;

import dev.carucci.fullstack_persona.model.User;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FakeUserDataStore {

		private static final List<User> USER_PROFILES = new ArrayList<>();

		static {
			USER_PROFILES.add(new User(2323232, "janetjones", "Janet Jones", "janet@gmail.com", null));
			USER_PROFILES.add(new User(2323344, "antoniojunior", "Antonio López", "antonio@outlook.com", null));
		}

		public List<User> getUserProfiles() {
			return USER_PROFILES;
		}

}
