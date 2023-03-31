package com.example.foodorderback.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.foodorderback.service.CustomUserDetailService;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired 
	private JwtFilter jwtFilter;
	
	@Autowired
	private CustomUserDetailService customUserDetailService;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailService);
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
	
	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	
	/*@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.cors().disable();
		http.csrf().disable().authorizeRequests().anyRequest().permitAll();
    } 
	*/ 
//	"/api/finalOrder/getOrderItemsByFinalOrderId/{id}", "/api/finalOrder/getAllActiveFinalOrders","/api/finalOrder/getFinalOrderById/{id}", "/api/finalOrder/createFinalOrder", "/api/meal/getAllMeals", "/api/mealType/getAllMealTypes", "/api/user/getCurrentUser", "/api/user/getAllEmployees"
	@Override
	/* , "/api/user/getAllUsers", , , "/api/finalOrder/getAllActiveFinalOrders" , "/api/user/getCurrentUser", "/api/user/getAllEmployees"*/
	/* ****** ne znam zasto na frontu kada se employee uloguje, prvi put kada se zove getAllActiveOrders bude forbidden, a kada se klikne na neki drugi tab i vrati na isti, ne bude vise tako, kao da prvi put se ne proveri token kako treba ****** */
    protected void configure(HttpSecurity http) throws Exception {
		http.cors().disable();
        http.csrf().disable().authorizeRequests().antMatchers("/api/login", "/api/user/registration", "/api/finalOrder/getAllActiveFinalOrders",
        		"/api/finalOrder/createFinalOrder",	"/api/meal/getMealsByMealTypeId/{id}",  "/api/finalOrder/setFinalOrderToDelivered/{finalOrderId}", "/api/finalOrder/getOrderItemsByFinalOrderId/{id}","/api/finalOrder/getFinalOrderById/{id}",  "/api/meal/getAllMeals", "/api/mealType/getAllMealTypes")
        	.permitAll().antMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll().anyRequest().authenticated()
                .and().exceptionHandling().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);;
    } 
    
	
	

}
