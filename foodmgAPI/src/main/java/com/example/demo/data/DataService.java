package com.example.demo.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repositories.Repository;

@Service
public class DataService {

	@Autowired
	private Repository repository;

	//データを取得表示
	public List<? extends DataInterface> getAll() {
		System.out.println("Service:getAll");
		return getRepository().findAll();
	}

	//名前で検索
	public List<? extends DataInterface> findByNameLike(String find) {
		System.out.println("Service:getByNameLike find[" + find + "]");
		return getRepository().findByNameLike("%" + find + "%");
	}

	//追加
	//	  @param item
	//	  @return 保存されたエンティティのID、成功しない場合0	
	public int add(DataInterface item) {
		System.out.println("Service:add[" + item + "]");
		if (item instanceof Food) {
			Food savedItem = getRepository().saveAndFlush((Food) item);
			return savedItem.getId();
		}
		return 0;
	}

	//削除
	public void delete(int id) {
		System.out.println("Service:delete[" + id + "]");
		getRepository().deleteById(id);
	}

	//更新
	public void update(int id, DataInterface item) {
		System.out.println("service:apdate[" + item + "]");

	}

	//getter,setter
	public Repository getRepository() {
		return repository;
	}

	public void setRepository(Repository repository) {
		this.repository = repository;
	}

}
