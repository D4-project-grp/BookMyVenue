package com.bookmyvenue.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration // to declare spring config class , containing spring beans
@EnableWebSecurity // to customize spring web security
@EnableMethodSecurity // to enable method level authorization rules
@RequiredArgsConstructor
public class SecurityConfiguration {
	private final JwtVerificationFilter jwtFilter;
	/*
	 * Configure a spring bean - to customize Spring sec filter chain - Method arg
	 * HttpSecurity -builder for SecurityFilterChain
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 1. disable CSRF
		http.csrf(csrf -> csrf.disable());
		// 2. Retain basic auth scheme (disable form based auth)
		http.httpBasic(httpBasic -> httpBasic.disable());
		// 2. Explicitly disable form-based login
		http.formLogin(form -> form.disable());
		http.cors(Customizer.withDefaults());
		// 3. Disable HttpSession (Tell Spring sec - DO NOT create HttpSession object
		// to store Spring security context holder
		http.sessionManagement(session ->
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 4. Add a rule - all endpoints - secured (requires Authentication)
		http.authorizeHttpRequests(request ->
		//public end points - swagger , sign in , sign up

						request.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/auth/signin", "/api/auth/signup","/api/venues/**","/api/venues/{venueId}","/uploads/**","/api/subscription/**","/api/amenity/**").permitAll()
//                         only customer should be able to book venue
                                .requestMatchers(HttpMethod.GET,"/api/menus/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/reviews/*").permitAll()
								. requestMatchers("/api/auth/**").hasAnyAuthority("CUSTOMER","VENUE_OWNER","ADMIN")
								. requestMatchers(HttpMethod.GET, "/api/auth/**").hasAnyAuthority("CUSTOMER","VENUE_OWNER","ADMIN")
								. requestMatchers(HttpMethod.POST,"/api/venues").hasAnyAuthority( "VENUE_OWNER")
								. requestMatchers("/api/bookings").hasAnyAuthority( "CUSTOMER")   
								. requestMatchers("/api/bookings/create-order").hasAnyAuthority( "CUSTOMER")   
								. requestMatchers(HttpMethod.POST,"/api/reviews").hasAnyAuthority( "CUSTOMER")
								
								. requestMatchers(HttpMethod.GET,"/api/venues/my-listing").hasAnyAuthority( "VENUE_OWNER")
								. requestMatchers("/api/bookings/owner/**").hasAnyAuthority( "VENUE_OWNER")
								// Only Admin should be able to approve or reject venue listed by venue owner status - COMPLETE
								.requestMatchers("/api/admin/**").hasAuthority("ADMIN") 
//                        .requestMatchers(HttpMethod.PATCH, "/{appId}").hasRole("ADMIN")
								// Only venue owner should be able to do the listing of venues
//                        .requestMatchers(HttpMethod.GET, "/").hasRole("Venue Owner")
								//all remaining end points need can be accessed by authenticated users
								.anyRequest().authenticated())
		//add jwt filter before 1st auth filter - Usernamepasswordauthfilter
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	/*
	 * Configure PasswordEncoder as spring bean
	 *
	 * 	 */
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	/*
	 * Configure AuthenticatinManager as spring bean
	 */
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
	@Bean
	CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}