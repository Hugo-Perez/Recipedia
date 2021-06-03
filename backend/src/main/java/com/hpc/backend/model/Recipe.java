package com.hpc.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;

    @Size(max=1500)
    private String ingredients;

    @Size(max=10000)
    private String steps;

    @ManyToOne
    @JsonIgnoreProperties("recipes")
    private RecipeBook recipeBook;

    private long views;

    private String imageURL;

    public Recipe() {
    }

    public Recipe(long id, String title, String description, String ingredients, String steps, RecipeBook recipeBook, long views, String imageURL) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.steps = steps;
        this.recipeBook = recipeBook;
        this.views = views;
        this.imageURL = imageURL;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    public RecipeBook getRecipeBook() {
        return recipeBook;
    }

    public void setRecipeBook(RecipeBook recipeBook) {
        this.recipeBook = recipeBook;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public long getViews() {
        return views;
    }

    public void setViews(long views) {
        this.views = views;
    }
}
