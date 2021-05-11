package com.hpc.backend.repository;

import com.hpc.backend.config.services.UserDetailsImpl;
import com.hpc.backend.model.RecipeBook;
import com.hpc.backend.model.auth.Role;
import com.hpc.backend.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeBookRepository extends JpaRepository<RecipeBook, Long> {

    List<RecipeBook> findByOwner(User owner);

    RecipeBook findFirstByIdAndOwner(Long id, User owner);

    boolean existsByTitle(String title);
}
