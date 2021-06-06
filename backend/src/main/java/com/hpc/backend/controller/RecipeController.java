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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    AuthenticationManager authenticationManager;

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
        if (authentication != null && authentication.isAuthenticated()) {
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
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/newRecipeBook", method = RequestMethod.POST)
    public ResponseEntity<?> newRecipeBook(Authentication authentication, @RequestBody RecipeBook recipeBook) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            if (recipeBookRepository.existsByTitle(recipeBook.getTitle()))
                return ResponseEntity.badRequest().body(new ApiResponse("A recipe book with this name already exists!"));


            recipeBook.setAuthor(user.get().getUsername());
            recipeBook.setOwner(user.get());

            RecipeBook insertedBook = recipeBookRepository.save(recipeBook);
            return ResponseEntity.ok(insertedBook);

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/editRecipeBook", method = RequestMethod.PUT)
    public ResponseEntity<?> editRecipeBook(Authentication authentication, @RequestBody RecipeBook recipeBook) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            RecipeBook originalRecipeBook = recipeBookRepository.findFirstByIdAndOwner(recipeBook.getId(), user.get());

            if (originalRecipeBook != null) {

                // We apply the changes to the original book so we control which fields get affected
                originalRecipeBook.setTitle(recipeBook.getTitle());
                originalRecipeBook.setDescription(recipeBook.getDescription());
                originalRecipeBook.setPrivacy(recipeBook.isPrivacy());

                RecipeBook insertedBook = recipeBookRepository.save(originalRecipeBook);
                return ResponseEntity.ok(insertedBook);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Original recipe book could not be found"));
            }

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/deleteRecipeBook", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteRecipeBook(Authentication authentication, @RequestParam long bookId) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            RecipeBook originalRecipeBook = recipeBookRepository.findFirstByIdAndOwner(bookId, user.get());

            if (originalRecipeBook != null) {
                // We can only delete the book if its not the default one
                // If we delete a book the recipes contained by it will be moved to the default book
                if (originalRecipeBook.isDeletable()) {

                    RecipeBook defaultBook = recipeBookRepository.findFirstByDeletableAndOwner(false, user.get());
                    Iterator<Recipe> recipes = originalRecipeBook.getRecipes().iterator();
                    recipes.forEachRemaining((recipe)-> {
                        recipe.setRecipeBook(defaultBook);
                        recipeRepository.saveAndFlush(recipe);
                    });

                    recipeBookRepository.deleteById(originalRecipeBook.getId());

                    return ResponseEntity.ok(new ApiResponse("Deleted book with id = " + bookId));
                } else {
                    return ResponseEntity.badRequest().body(new ApiResponse("This Recipe Book cannot be deleted!"));
                }
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("The RecipeBook you tried to delete could not be found"));
            }

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/myRecipeBooks", method = RequestMethod.POST)
    public ResponseEntity<?> myRecipeBooks(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            List<RecipeBook> myRecipeBooks = recipeBookRepository.findByOwner(user.get());
            return ResponseEntity.ok().body(myRecipeBooks);

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }



    //============================
    //========= RECIPES ==========
    //============================

    @RequestMapping(value = "/newRecipe", method = RequestMethod.POST)
    public ResponseEntity<?> newRecipe(Authentication authentication, @RequestParam Long recipeBookId,  @RequestBody Recipe recipe) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            Optional<RecipeBook> recipeBook = recipeBookRepository.findById(recipeBookId);

            if (recipeBook.isPresent()) {
                RecipeBook bookFound = recipeBook.get();

                recipe.setRecipeBook(bookFound);
                recipeRepository.save(recipe);

                return ResponseEntity.ok(recipe);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Recipe Book could not be found, try again"));
            }

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/getRecipe", method = RequestMethod.GET)
    public ResponseEntity<?> getRecipe(Authentication authentication, @RequestParam Long recipeId) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            Optional<Recipe> recipe = recipeRepository.findById(recipeId);

            if (recipe.isPresent()) {
                boolean isOwner = recipe.get().getRecipeBook().getOwner().equals(user.get());

                recipeRepository.addView(recipeId);

                Map<String, Object> response = new HashMap<>();

                response.put("recipe", recipe);
                response.put("isOwner", isOwner);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Recipe could not be found, try again"));
            }

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/editRecipe", method = RequestMethod.PUT)
    public ResponseEntity<?> editRecipe(Authentication authentication, @RequestParam Long recipeBookId, @RequestParam Long recipeId,  @RequestBody Recipe recipe) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            Optional<Recipe> originalRecipe = recipeRepository.findById(recipeId);

            if (originalRecipe.isPresent()) {
                boolean isOwner = originalRecipe.get().getRecipeBook().getOwner().equals(user.get());
                if (!isOwner) {
                    return ResponseEntity.status(403).body(new ApiResponse("You are not the owner of this recipe"));
                }

                Optional<RecipeBook> inputBook = recipeBookRepository.findById(recipeBookId);

                inputBook.ifPresent((book)->recipe.setRecipeBook(book));
                recipe.setId(originalRecipe.get().getId());

                recipeRepository.save(recipe);
                return ResponseEntity.ok(recipe);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Recipe could not be found, try again"));
            }

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/deleteRecipe", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteRecipe(Authentication authentication, @RequestParam Long recipeId) {
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

            Optional<Recipe> originalRecipe = recipeRepository.findById(recipeId);

            if (originalRecipe.isPresent()) {
                boolean isOwner = originalRecipe.get().getRecipeBook().getOwner().equals(user.get());
                if (!isOwner) {
                    return ResponseEntity.status(403).body(new ApiResponse("You are not the owner of this recipe"));
                }

                recipeRepository.delete(originalRecipe.get());
                return ResponseEntity.ok(new ApiResponse("Recipe deleted successfully"));
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse("Recipe could not be found, try again"));
            }

        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/searchRecipes", method = RequestMethod.GET)
    public ResponseEntity<?> searchRecipes(Authentication authentication, String searchText, String ingredients, Pageable page) {
        if (authentication != null && authentication.isAuthenticated()) {
            Page<Recipe> recipesFound;

            // We check if ingredients are present in the query
            if (((ingredients != null) && (!ingredients.trim().isEmpty()))){
                Collection<String> ingredientsCollection = Arrays.asList(ingredients.trim().split(","));
                String regexp = ingredientsCollection.stream()
                        .reduce("", (first,second) -> first + "|" + second);
                regexp = regexp.substring(1, regexp.length());

                recipesFound = recipeRepository.searchWithIngredientsAndPrivacy(searchText, regexp, page);
            } else {
                System.out.println("Public search");
                recipesFound = recipeRepository.searchWithPrivacy(searchText, page);
            }


            return ResponseEntity.ok(recipesFound);
        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }

    @RequestMapping(value = "/randomRecipe", method = RequestMethod.GET)
    public ResponseEntity<?> searchRecipes(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Recipe randomRecipe = recipeRepository.randomRecipe();

            if (randomRecipe == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No recipe found"));

            return ResponseEntity.ok(randomRecipe);
        } else {
            return ResponseEntity.status(403).body(new ApiResponse("Authentication is needed for this method"));
        }
    }
}
