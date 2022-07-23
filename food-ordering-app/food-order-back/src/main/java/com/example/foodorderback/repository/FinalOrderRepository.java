package com.example.foodorderback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.foodorderback.model.FinalOrder;
@Repository
public interface FinalOrderRepository extends JpaRepository<FinalOrder, Long>{

}
