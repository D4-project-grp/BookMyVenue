package utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;

public class PrincipleUtils {

    public static Object getPrincipal(){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication=context.getAuthentication();
        return  authentication.getPrincipal();
    }

}
