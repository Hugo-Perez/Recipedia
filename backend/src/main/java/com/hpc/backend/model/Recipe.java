package com.hpc.backend.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    @ManyToMany
    private List<Ingredient> ingredients;
    @ManyToOne
    private RecipeBook recipeBook;
    @ElementCollection
    private List<String> steps;

}
