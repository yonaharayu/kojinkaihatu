package com.example.demo.data;

import java.util.Date;

public interface DataInterface {
	public int getId();

	public void setId(int id);

	public String getName();

	public void setName(String name);

	public int getStock();

	public void setStock(int stock);

	public int getPrice();

	public void setPrice(int price);

	public Date getExdate();

	public void setExdate(Date exdate);
}
