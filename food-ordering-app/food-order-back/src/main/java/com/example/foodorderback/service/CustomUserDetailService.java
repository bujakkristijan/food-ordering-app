package com.example.foodorderback.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.foodorderback.model.User;
import com.example.foodorderback.repository.UserRepository;




@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsername(username);
		
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
		
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
	}
	
	

}