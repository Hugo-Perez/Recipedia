package com.hpc.backend.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class RecipeBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany
    private List<Recipe> recipes;

    private String title;
    private String author;

    public RecipeBook() {
    }

    public RecipeBook(long id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
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
}
