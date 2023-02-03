package com.b304.bobs.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="refrige")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Refrige {
    @Id
    @GeneratedValue
    @Column(name="refrige_id",columnDefinition = "INT", nullable = false)
    private int refrige_id;

    @Column(name="refrige_ingredient_prior",columnDefinition = "BOOLEAN", nullable = false)
    private boolean refrige_ingredient_prior;

    @Column(name="refrige_ingredient_delete",columnDefinition = "BOOLEAN", nullable = false)
    private boolean refrige_ingredient_delete;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ingredient_id")
    private Ingredient ingredient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
}