package com.hpc.backend.controller;

import com.hpc.backend.config.services.UserDetailsImpl;
import com.hpc.backend.model.RecipeBook;
import com.hpc.backend.model.auth.User;
import com.hpc.backend.repository.RecipeBookRepository;
import com.hpc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    RecipeBookRepository recipeBookRepository;

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value="/myRecipeBooks", method=RequestMethod.POST)
    public ResponseEntity<?> myRecipeBooks(Authentication authentication) {
        if (authentication != null) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            if(user.isPresent()) {
                List<RecipeBook> myRecipeBooks = recipeBookRepository.findByOwner(user.get());
                return ResponseEntity.ok().body(myRecipeBooks);
            } else {
                return ResponseEntity.badRequest().body("No user found");
            }

        } else {
            return ResponseEntity.badRequest().body("Unable to load recipes");
        }
    }
}
