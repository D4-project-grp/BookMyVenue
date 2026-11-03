package com.bookmyvenue.services;
import org.springframework.http.HttpStatus;
import com.bookmyvenue.config.UploadProperties;
import com.bookmyvenue.custom_exception.AuthenticationFailedException;
import com.bookmyvenue.custom_exception.ResourceAlreadyExistsException;
import com.bookmyvenue.dto.*;
import com.bookmyvenue.entities.User;
import com.bookmyvenue.enums.UploadFolder;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.security.CustomUserDetailsImpl;
import com.bookmyvenue.security.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    final private UserRepository userRepository;
    final private ModelMapper mapper;
    final private PasswordEncoder encoder;
    final private FileStorageService fileStorageService;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager manager;
    @Override
    public String registerUser(SignupRequest signupRequest, MultipartFile profileImage) throws IOException {
        String imagePath = fileStorageService.saveImage(
                profileImage,
                UploadFolder.PROFILE_IMAGES.getFolderName()
        );

        String rawPassword=signupRequest.getPassword();
        String encryptedPassword=encoder.encode(rawPassword);
        User usr=mapper.map(signupRequest,User.class);
        usr.setPassword(encryptedPassword);
        usr.setProfileImg(imagePath);
        if (userRepository.existsByEmail( signupRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Email is already registered.");
        }


        try {
            userRepository.save(usr);
        } catch (DataIntegrityViolationException ex) {
            throw new ResourceAlreadyExistsException("Email is already registered.");
        }
        return "you are successfully registered!";
    }

    @Override
    public SigninResponse authenticate(SigninRequest request) {
         /*
		 * 1. Create Authentication object
public UsernamePasswordAuthenticationToken(Object username|email,
Object password) throws AuthenticationExcpetion
		 */
        UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        /*
         * 2. Invoke authenticate method of AuthenticationManager
         */
        log.info("******** Before auth {} ",token.isAuthenticated()); //false
        Authentication fullyAutheticated = manager.authenticate(token);
        log.info("******** After succesful  auth {}" ,fullyAutheticated.isAuthenticated()); //true
        log.info("******** Contents of auth {} ", fullyAutheticated.getPrincipal());//custom user details
        CustomUserDetailsImpl principal =(CustomUserDetailsImpl) fullyAutheticated.getPrincipal();
        return new SigninResponse(  new UserDto(
                principal.getUserId(),
                principal.getFirstName(),
                principal.getLastName(),
                principal.getEmail(),
                principal.getRole()
        ),jwtUtils.generateJWT(principal));

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    


}
