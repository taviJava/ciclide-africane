package com.tavi.cilideafricaneb.demo.security;

import com.tavi.cilideafricaneb.demo.persistance.dto.UserDto;
import com.tavi.cilideafricaneb.demo.persistance.model.Role;
import com.tavi.cilideafricaneb.demo.persistance.model.UserModel;
import com.tavi.cilideafricaneb.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service()
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;



    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserModel> personCredentialModelOptional = userRepository.findByEmail(email);
        if (!personCredentialModelOptional.isPresent()) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        UserModel userModel = personCredentialModelOptional.get();
        String userName = userModel.getEmail();
        String password = userModel.getPassword();
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        //ROLE_ADMIN is important to be picked up by hasRole from @PreAuthorize in DummyConteoller
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" +  userModel.getRole().name().toUpperCase());
        authorities.add(simpleGrantedAuthority);
        return new User(userName, password, authorities);
    }
    public UserModel register(UserDto userDto) {
        List<UserModel> userModels = userRepository.findAll();
        if (userModels.size() > 0){
            userDto.setRole("Standard");
        }else{
            userDto.setRole("Admin");
        }
        UserModel newUser = new UserModel();
        newUser.setEmail(userDto.getEmail());

        newUser.setRole(Role.valueOf(userDto.getRole()));
        newUser.setPassword(bcryptEncoder.encode(userDto.getPassword()));
        return userRepository.save(newUser);
    }
}
