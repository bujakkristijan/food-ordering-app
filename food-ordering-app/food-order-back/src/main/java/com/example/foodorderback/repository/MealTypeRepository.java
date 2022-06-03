package com.example.foodorderback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.foodorderback.model.MealType;

@Repository
public interface MealTypeRepository extends JpaRepository<MealType, Long> {

}
