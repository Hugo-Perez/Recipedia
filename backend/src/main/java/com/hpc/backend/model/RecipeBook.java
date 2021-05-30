package com.hpc.backend.model;

import com.hpc.backend.model.auth.User;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.List;

@Entity
public class RecipeBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "recipeBook")
    private List<Recipe> recipes;

    private String title;
    private String author;
    private String description;

    private boolean privacy;

    private boolean deletable = true;

    @ManyToOne
    private User owner;

    public RecipeBook() {
    }

    public RecipeBook(long id, String title, String author, String description, boolean privacy, User owner) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.privacy = privacy;
        this.owner = owner;
    }

    public RecipeBook(String title, String author, String description, boolean privacy, User owner) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.privacy = privacy;
        this.owner = owner;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPrivacy() {
        return privacy;
    }

    public void setPrivacy(boolean privacy) {
        this.privacy = privacy;
    }

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(boolean deletable) {
        this.deletable = deletable;
    }
}
