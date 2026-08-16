package com.bookmyvenue.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			try {
				String jwt = authHeader.substring(7);
				log.info("*********** JWT {}",jwt);
				Claims payload = jwtUtils.verifyJwtAndExtractClaims(jwt);

				Long userId = payload.get("user_id", Long.class);
				String roleName = payload.get("user_role", String.class);
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userId, null,
						List.of(new SimpleGrantedAuthority(roleName)));
				SecurityContextHolder.getContext().setAuthentication(token);
			} catch (Exception e) {
				// only a REAL jwt problem lands here now - errors from controllers/services
				// further down the chain no longer get disguised as a JWT failure
				log.error("JWT verification failed", e);
				SecurityContextHolder.clearContext();
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().print("Invalid JWT - Auth Failed !!!!!!");
				return;
			}
		}

		// runs OUTSIDE the try/catch above - so if a controller/service later in the
		// chain throws (e.g. a Razorpay call failing), it surfaces as its own real
		// error instead of being reported here as a fake 401
		filterChain.doFilter(request, response);
	}

}