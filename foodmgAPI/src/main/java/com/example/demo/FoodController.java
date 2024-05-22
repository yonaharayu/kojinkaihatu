package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.data.DataInterface;
import com.example.demo.data.DataService;
import com.example.demo.data.Food;

@RestController
public class FoodController {
	@Autowired
	DataService service;

	//データ取得表示
	@GetMapping("/foodmg")
	@CrossOrigin
	public List<? extends DataInterface> fruits() {
		System.out.println("foodmg/index");
		return service.getAll();
	}

	//データ追加
	@PostMapping("/foodmg/add")
	@CrossOrigin
	public int add(@RequestBody Food food) {
		System.out.println("foodmg/add(post)");
		return service.add(food);
	}

	//データ削除
	@DeleteMapping("/foodmg/delete/{id}")
	@CrossOrigin
	public void delete(@PathVariable("id") int food) {
		System.out.println("foodmg/delete(post)");
		service.delete(food);
	}

	//名前でデータ検索
	@PostMapping("/foodmg/find")
	@CrossOrigin
	public List<? extends DataInterface> find(@RequestBody Map<String, String> request) {
		System.out.println("foodmg/find(post)");
		String find = request.get("find");
		return service.findByNameLike("%" + find + "%");
	}

	//データ編集
	//	@PutMapping("/foodmg/update/{id}")
	//	@CrossOrigin
	//	public void update(@PathVariable("id") int id, @RequestBody Food food) {
	//		System.out.println("foodmg/update(post)");
	//		service.update(food);
	//	}

}
