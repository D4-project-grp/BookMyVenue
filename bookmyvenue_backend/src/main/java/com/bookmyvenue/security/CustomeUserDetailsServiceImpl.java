package com.bookmyvenue.security;
import java.util.List;

import com.bookmyvenue.custom_exception.AuthenticationFailedException;
import com.bookmyvenue.custom_exception.ResourceNotFoundException;
import com.bookmyvenue.entities.User;
import com.bookmyvenue.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CustomeUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
	private final PasswordEncoder encoder;
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User usr=userRepository.findByEmail(username).orElseThrow(()->new AuthenticationFailedException("Enter valid email"));
//
//
//		List<GrantedAuthority> authorities=List.of(new SimpleGrantedAuthority(usr.getRole().name()));
//
//		return new org.springframework.security.core.userdetails.User(usr.getEmail(),usr.getPassword(),authorities);
//	}
@Override
public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	log.info("********* in load user by user name ");
	User user=userRepository.findByEmail(email)
			.orElseThrow(() -> new ResourceNotFoundException("User by email not found !!!!!"));
	//=> user by email exists -> create UserDetails object -load user details lifted from DB
	return new CustomUserDetailsImpl(user.getId(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getPassword(),user.getRole());
}

}
