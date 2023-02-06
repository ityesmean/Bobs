package com.b304.bobs.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="recipe")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id
    @Column(name="recipe_id", nullable = false)
    private Long recipe_id;

    @Column(name="recipe_name",columnDefinition = "VARCHAR(20)", nullable = false)
    private String recipe_name;

    @Column(name="recipe_content",columnDefinition = "VARCHAR(100)")
    private String recipe_content;

    @Column(name="recipe_img",columnDefinition = "VARCHAR(100)")
    private String recipe_img;

    @Column(name="recipe_time",columnDefinition = "DATETIME", nullable = false)
    private String recipe_time;

    @Column(name="recipe_amount",columnDefinition = "VARCHAR(10)")
    private String recipe_amount;

    @Column(name="reciep_level",columnDefinition = "VARCHAR(10)")
    private String recipe_level;

    @Column(name="recipe_category",columnDefinition = "VARCHAR(10)")
    private String recipe_category;

    @Column(name="recipe_hit", columnDefinition = "INT", nullable = false)
    private int recipe_hit;

    @Builder
    public Recipe(Long recipe_id, String recipe_name, String recipe_content, String recipe_img, String recipe_time, String recipe_amount, String recipe_level, String recipe_category, int recipe_hit) {
        this.recipe_id = recipe_id;
        this.recipe_name = recipe_name;
        this.recipe_content = recipe_content;
        this.recipe_img = recipe_img;
        this.recipe_time = recipe_time;
        this.recipe_amount = recipe_amount;
        this.recipe_level = recipe_level;
        this.recipe_category = recipe_category;
        this.recipe_hit = recipe_hit;
    }

    @OneToMany(mappedBy = "recipe")
    List<RecipeStep> recipe_steps = new ArrayList<RecipeStep>();

    @OneToMany(mappedBy = "recipe")
    List<RecipeIngredient> recipe_ingredients = new ArrayList<RecipeIngredient>();

}
