package com.tavi.cilideafricaneb.demo.service;

import com.tavi.cilideafricaneb.demo.persistance.dto.UserDto;
import com.tavi.cilideafricaneb.demo.persistance.model.Role;
import com.tavi.cilideafricaneb.demo.persistance.model.UserModel;
import com.tavi.cilideafricaneb.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void add(UserDto userDto){
     userRepository.save(getModel(new UserModel(),userDto));
    }
    public void update(UserDto userDto){
        Optional<UserModel> userModelOptional = userRepository.findById(userDto.getId());
        if (userModelOptional.isPresent()){
            UserModel userModel = userModelOptional.get();
            getModel(userModel,userDto);
        }
    }
    public void delete (long id){
        userRepository.deleteById(id);
    }

    public UserDto getOne(long id){
        Optional<UserModel> userModelOptional = userRepository.findById(id);
        UserDto userDto = new UserDto();
        if (userModelOptional.isPresent()){
            UserModel userModel = userModelOptional.get();
            getDto(userModel,userDto);
        }
        return userDto;
    }
    public UserDto getByEmail(String email){
        Optional<UserModel> userModelOptional = userRepository.findByEmail(email);
        UserDto userDto = new UserDto();
        if (userModelOptional.isPresent()){
            UserModel userModel = userModelOptional.get();
            getDto(userModel,userDto);
        }
        return userDto;
    }

    public List<UserDto>getAll(){
        List<UserModel> userModels = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for (UserModel userModel: userModels){
            userDtos.add(getDto(userModel, new UserDto()));
        }
        return userDtos;
    }
    private UserDto getDto(UserModel userModel, UserDto userDto){
        userDto.setId(userModel.getId());
        userDto.setEmail(userModel.getEmail());
        userDto.setPassword(userModel.getPassword());
        userDto.setRole(userModel.getRole().name());
        return userDto;
    }

   private UserModel getModel(UserModel userModel, UserDto userDto){
        userModel.setEmail(userDto.getEmail());
        userModel.setPassword(userDto.getPassword());
        userModel.setRole(Role.valueOf(userDto.getRole()));
        return userModel;
   }

}
