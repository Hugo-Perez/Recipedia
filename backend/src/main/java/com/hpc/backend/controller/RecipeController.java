package com.hpc.backend.controller;

import com.hpc.backend.config.services.UserDetailsImpl;
import com.hpc.backend.model.ApiResponse;
import com.hpc.backend.model.Recipe;
import com.hpc.backend.model.RecipeBook;
import com.hpc.backend.model.auth.User;
import com.hpc.backend.repository.RecipeBookRepository;
import com.hpc.backend.repository.RecipeRepository;
import com.hpc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    RecipeBookRepository recipeBookRepository;

    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    UserRepository userRepository;

    //============================
    //====== RECIPE BOOKS ========
    //============================

    @RequestMapping(value = "/recipeBook", method = RequestMethod.GET)
    public ResponseEntity<?> getRecipeBook(Authentication authentication, @RequestParam long bookId) {
        if (authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            Optional<RecipeBook> requestedBook = recipeBookRepository.findById(bookId);
            if (requestedBook.isPresent()) {

                RecipeBook bookFound = requestedBook.get();

                if (bookFound.isPrivacy()) { //Only owner gets to see this book

                    if (bookFound.getOwner().equals(user.get()))
                        return ResponseEntity.ok(bookFound);
                    else
                        return ResponseEntity.badRequest().body(new ApiResponse("The requested book is private, ask for the owner's permission"));

                } else {
                    return ResponseEntity.ok(bookFound);
                }

            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("The requested recipe book could not be found"));
            }

        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("User not found, try logging in again"));
        }
    }

    @RequestMapping(value = "/newRecipeBook", method = RequestMethod.POST)
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

    @RequestMapping(value = "/editRecipeBook", method = RequestMethod.PUT)
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

    @RequestMapping(value = "/deleteRecipeBook", method = RequestMethod.DELETE)
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

    @RequestMapping(value = "/myRecipeBooks", method = RequestMethod.POST)
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



    //============================
    //========= RECIPES ==========
    //============================

    @RequestMapping(value = "/newRecipe", method = RequestMethod.POST)
    public ResponseEntity<?> newRecipe(Authentication authentication, @RequestParam Long recipeBookId,  @RequestBody Recipe recipe) {
        if (authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            Optional<RecipeBook> recipeBook = recipeBookRepository.findById(recipeBookId);

            if (recipeBook.isPresent()) {
                recipeRepository.save(recipe);

                RecipeBook bookFound = recipeBook.get();
                List<Recipe> recipeList = bookFound.getRecipes();
                recipeList.add(recipe);

                recipeBookRepository.save(bookFound);

                return ResponseEntity.ok(recipeBook);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Recipe Book could not be found, try again"));
            }

        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("Unable to load recipes"));
        }
    }
}
