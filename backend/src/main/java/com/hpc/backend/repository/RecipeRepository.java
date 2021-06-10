package com.hpc.backend.repository;

import com.hpc.backend.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface RecipeRepository extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor<Recipe> {


    //Page<Recipe> findByTitleContainingOrDescriptionContaining(String titleSearch, String descSearch, Pageable page);

    @Query(value = "SELECT re.* FROM recipe re " +
            "INNER JOIN recipe_book rb ON re.recipe_book_id = rb.id " +
            "WHERE (re.title LIKE %?1% OR re.description LIKE %?1%) " +
            "AND (rb.privacy = 0)",
            countQuery = "SELECT count(*) FROM recipe re " +
                    "INNER JOIN recipe_book rb ON re.recipe_book_id = rb.id " +
                    "WHERE (re.title LIKE %?1% OR re.description LIKE %?1%) " +
                    "AND (rb.privacy = 0)",
            nativeQuery = true)
    Page<Recipe> searchWithPrivacy(String searchText, Pageable page);

    @Query(value = "SELECT re.* FROM recipe re " +
                "INNER JOIN recipe_book rb ON re.recipe_book_id = rb.id " +
                "WHERE (re.title LIKE %?1% OR re.description LIKE %?1%) " +
                "AND (rb.privacy = 0) AND (re.ingredients REGEXP ?2)",
            countQuery = "SELECT count(*) FROM recipe re " +
                    "INNER JOIN recipe_book rb ON re.recipe_book_id = rb.id " +
                    "WHERE (re.title LIKE %?1% OR re.description LIKE %?1%) " +
                    "AND (rb.privacy = 0) AND (re.ingredients REGEXP ?2)",
            nativeQuery = true)
    Page<Recipe> searchWithIngredientsAndPrivacy(String searchText, String ingredientsRegExp, Pageable page);

    @Query(value = "SELECT re.* FROM recipe re " +
            "INNER JOIN recipe_book rb ON re.recipe_book_id = rb.id " +
            "WHERE rb.privacy = 0 ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Recipe randomRecipe();

    List<Recipe> findByIdIn(List<Long> ids);


    @Transactional
    @Modifying
    @Query(value = "UPDATE recipe re SET re.views = re.views + 1 where re.id = ?1", nativeQuery = true)
    void addView(Long id);
}
