package dev.carucci.fullstack_persona.bucket;

public enum BucketName {

		PROFILE_IMAGE("fullstack-persona.profile-pictures");

		private final String bucketName;

		BucketName(String bucketName) {
				this.bucketName = bucketName;
		}

		public String getBucketName() {
				return bucketName;
		}

}
