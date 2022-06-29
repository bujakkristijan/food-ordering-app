package com.example.foodorderback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.foodorderback.model.Image;

@Repository
public interface ImageDbRepository extends JpaRepository<Image, Long>{

}
