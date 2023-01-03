package CosplayCostumes.security.config;


import CosplayCostumes.security.TokenAuthenticationFilter;
import CosplayCostumes.security.user.model.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.hibernate.criterion.Restrictions.and;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

    private final TokenAuthenticationFilter tokenAuthenticationFilter;
    public static final String ADMIN = UserRole.Admin.toString();
    public static final String USER = UserRole.User.toString();

    private static final String[] APPLICATION_WHITE_LIST = {
            "/auth/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",

            "/api/sub-category/get-all",
            "/api/category/get-all",
            "/api/condition/get-all",
            "/api/opinion/get-all",
            "/api/opinion-image/get-all",
            "/api/order/get-all",
            "/api/product/get-all",
            "/api/product-image/get-all",
            "/api/product-type/get-all",
            "/api/quality/get-all",

            "/api/sub-category/find/?*",
            "/api/category/find/?*",
            "/api/condition/find/?*",
            "/api/opinion/find/?*",
            "/api/opinion-image/find/?*",
            "/api/order/find/?*",
            "/api/product/find/?*",
            "/api/product-image/find/?*",
            "/api/product-type/find/?*",
            "/api/quality/find/?*",

            "/error",
            "/csrf"
    };

    private static final String[] ADMINISTRATOR_WHITE_LIST = {
            "?*/add",
            "?*/update",
            "?*/api/order-status/get-all-object",
            "?*/disable-visibility"
    };

    private static final String[] USER_AND_ADMINISTRATOR_WHITE_LIST = {
            "?*/add-object",
            "?*/update-object",
            "?*/disable-visibility-object",
            "?*/update-status-object",
            "?*/find-object/?*",
            "/api/opinion-image/add-object",
            "?*/get-all-objects"
    };

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(USER_AND_ADMINISTRATOR_WHITE_LIST).hasAnyAuthority(USER, ADMIN)
                .antMatchers(ADMINISTRATOR_WHITE_LIST).hasAuthority(ADMIN)
                .antMatchers(APPLICATION_WHITE_LIST).permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().and().csrf().disable();
        return http.build();
    }

}
