package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.data.DataInterface;
import com.example.demo.data.Food;

public interface Repository extends JpaRepository<Food, Integer> {

	public List<Food> findByNameLike(String name);

	public Food save(DataInterface item);

}
