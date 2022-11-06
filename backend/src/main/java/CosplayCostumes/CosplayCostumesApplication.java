package CosplayCostumes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class CosplayCostumesApplication {
    public static void main(String[] args) {
        SpringApplication.run(CosplayCostumesApplication.class, args);
    }
}
