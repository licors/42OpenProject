package seoul42.openproject.selectfood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class SelectFoodApplication {

    static {
        System.setProperty("spring.config.location", "classpath:/connection.yml,classpath:/application.yml");
    }

    public static void main(String[] args) {
        SpringApplication.run(SelectFoodApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
