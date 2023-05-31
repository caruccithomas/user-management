package dev.carucci.fullstack_persona.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWS {

    @Bean
    public AmazonS3 s3() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(
                "AKIA2WQIYMTGPXSBMDJI",
                "9Fw/XZezt+w5ExYzJ+nAElMfpKKphEpPF9lnAIDX"
        );

        return AmazonS3ClientBuilder
                .standard()
                .withRegion("sa-east-1")
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
