package com.hpc.backend.controller;

import com.hpc.backend.config.services.UserDetailsImpl;
import com.hpc.backend.model.ApiResponse;
import com.hpc.backend.model.Recipe;
import com.hpc.backend.model.RecipeBook;
import com.hpc.backend.model.auth.User;
import com.hpc.backend.repository.RecipeBookRepository;
import com.hpc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
        if (authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            List<RecipeBook> myRecipeBooks = recipeBookRepository.findByOwner(user.get());
            return ResponseEntity.ok().body(myRecipeBooks);

        } else {
            return ResponseEntity.badRequest().body("Unable to load recipes");
        }
    }

    @RequestMapping(value="/newRecipeBook", method=RequestMethod.POST)
    public ResponseEntity<?> newRecipeBook(Authentication authentication, @RequestBody RecipeBook recipeBook) {
        if (authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            if (recipeBookRepository.existsByTitle(recipeBook.getTitle()))
                return ResponseEntity.badRequest().body(new ApiResponse("A recipe book with this name already exists!"));


            recipeBook.setAuthor(user.get().getUsername());
            recipeBook.setOwner(user.get());

            RecipeBook insertedBook = recipeBookRepository.save(recipeBook);
            return ResponseEntity.ok(insertedBook);

        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("User not found, try logging in again"));
        }
    }

    @RequestMapping(value="/editRecipeBook", method=RequestMethod.PUT)
    public ResponseEntity<?> editRecipeBook(Authentication authentication, @RequestBody RecipeBook recipeBook) {
        if (authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            RecipeBook originalRecipeBook = recipeBookRepository.findFirstByIdAndOwner(recipeBook.getId(), user.get());

            if (originalRecipeBook != null) {
                RecipeBook insertedBook = recipeBookRepository.save(recipeBook);
                return ResponseEntity.ok(insertedBook);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Original recipe book could not be found"));
            }

        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("User not found, try logging in again"));
        }
    }

    @RequestMapping(value="/deleteRecipeBook", method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteRecipeBook(Authentication authentication, @RequestParam long id) {
        if (authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());


            RecipeBook originalRecipeBook = recipeBookRepository.findFirstByIdAndOwner(id, user.get());

            if (originalRecipeBook != null) {
                recipeBookRepository.delete(originalRecipeBook);
                return ResponseEntity.ok(new ApiResponse("Deleted book with id = " + id));
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("The RecipeBook you tried to delete could not be found"));
            }


        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("User not found, try logging in again"));
        }
    }

}
