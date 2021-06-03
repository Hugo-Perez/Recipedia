package com.hpc.backend.repository;

import com.hpc.backend.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findByTitleContainingOrDescriptionContaining(String titleSearch, String descSearch, Pageable page);

    @Transactional
    @Modifying
    @Query(value = "UPDATE recipe re SET re.views = re.views + 1 where re.id = ?1", nativeQuery = true)
    void addView(Long id);
}
