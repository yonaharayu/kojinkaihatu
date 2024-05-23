import React, { useState, useEffect } from 'react';
import  './Food.css';
function Food() {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // 名前検索結果を保存する状態を追加
  const [isEditing, setIsEditing] = useState(false);   //編集モードかどうかを判別するための状態
  const [currentId, setCurrentId] = useState(null); //現在編集中のアイテムのID
  const [formData, setFormData] = useState({    //フォームデータを保持する状態
    name: '',
    price: '',
    stock: '',
    exdate: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/foodmg')
      .then(response => response.json())
      .then(value => {
        setData(value);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([]);
      });
  }, []);


  //データ表示
  const FoodData = data && data.map((item, index) => {
    const exdate = new Date(item.exdate);
    const year = exdate.getFullYear();
    const month = ('0' + (exdate.getMonth() + 1)).slice(-2);
    const day = ('0' + exdate.getDate()).slice(-2);
    const formattedExdate = `${year}-${month}-${day}`;
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
        <td>{formattedExdate}</td>
        <td> <button onClick={() => deleteStock(item.id)}>削除</button></td>
        {/* <td> <button onClick={() => updateStock(item.id)}>変更</button></td> */}
      </tr>
    );
  });


  //データ追加
  const addStock = (formData) => {
    fetch('http://localhost:8080/foodmg/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return fetchFoodData();
      } else {
        console.error('Failed to add stock');
      }
    })
    .catch(error => {
      console.error('Error adding stock:', error);
    });
  }


  //データ再表示
  const fetchFoodData = () => {
    fetch('http://localhost:8080/foodmg')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching fruit data:', error);
        setData([]);
      });
  }
  //フォーム送信でデータ保持
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newStock = {
      name: formData.get('name'),
      price: parseInt(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      exdate: formData.get('exdate')
    };
    addStock(newStock);
  }

  //検索機能
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');

    fetch('http://localhost:8080/foodmg/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ find: name })
    })
    .then(response => response.json())
    .then(data => {
      setSearchResults(Array.isArray(data) ? data : []);
    })
    .catch(error => {
      console.error('Error searching by name:', error);
      setSearchResults([]);
    });
  }

    // データ削除
  const deleteStock = (id) => {
    fetch(`http://localhost:8080/foodmg/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (response.ok) {
        return fetchFoodData();
      } else {
        console.error('Failed to delete stock');
      }
    })
    .catch(error => {
      console.error('Error deleting stock:', error);
    });
  }



  //編集ボタンがクリックされたときに呼び出され、編集フォームを表示し、既存のデータをフォームにセット
  // const handleEditClick = (item) => {
  //   setIsEditing(true);
  //   setCurrentId(item.id);
  //   setFormData({
  //     name: item.name,
  //     price: item.price,
  //     stock: item.stock,
  //     exdate: item.exdate
  //   });
  // };

    //handleUpdateSubmit関数:
    //フォームが送信されたときに呼び出され、updateStock関数を使用してデータを更新
    // const handleonSubmit = (event) => {
    //   event.preventDefault();
    //   updateStock(currentId, formData);
    // };

    //handleChange関数:
    //フォーム入力が変更されたときに呼び出され、formDataを更新
    // const handleChange = (event) => {
    //   const { name, value } = event.target;
    //   setFormData(prevFormData => ({
    //     ...prevFormData,
    //     [name]: value
    //   }));
    // };
    
    //編集フォームの追加:
    //編集フォームが表示されるようにして、編集が完了するとデータが更新され、フォームがリセットされます。
    // const updateStock = (id, updatedData) => {
    //   fetch(`http://localhost:8080/foodmg/update/${id}`, {
    //     method: 'PUT',
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(updatedData)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       console.log('更新成功しました');
    //       fetchFoodData();
    //       setIsEditing(false);
    //       setFormData({
    //         name: '',
    //         price: '',
    //         stock: '',
    //         exdate: ''
    //       });
    //     } else {
    //       console.error('Failed to update stock');
    //     }
    //   })
    //   .catch(error => console.error('Error updating stock:', error));
    // };

  //検索時のデータ表示
  const SearchResults = searchResults.map((item, index) => {
    const exdate = new Date(item.exdate);
    const year = exdate.getFullYear();
    const month = ('0' + (exdate.getMonth() + 1)).slice(-2);
    const day = ('0' + exdate.getDate()).slice(-2);
    const formattedExdate = `${year}-${month}-${day}`;
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
        <td>{formattedExdate}</td>
      </tr>
    );
  });

  

  return (
    <div>
      <h3>食材在庫情報</h3>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>名前</th>
            <th>価格</th>
            <th>個数</th>
            <th>賞味期限</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {FoodData}
        </tbody>
      </table>
      {/* データ追加 */}
      <h3>在庫情報追加</h3>
      <form onSubmit={handleSubmit}>
        <label>
          商品名:
          <input type="text" name="name" required />
        </label>
        <label>
          単価:
          <input type="number" name="price" required />
        </label>
        <label>
          個数:
          <input type="number" name="stock" required />
        </label>
        <label>
          賞味期限:
          <input type="date" name="exdate" required />
        </label>
        <button type="submit">追加</button>
      </form>
      {/* データ検索 */}
      <h3>在庫情報検索</h3>
      <form onSubmit={handleSearchSubmit}>
        <label>
          名前:
          <input type="text" name="name" required />
        </label>
        <button type="submit">名前で検索</button>
      </form>
      {searchResults.length > 0 && (
            <div>
            <h4>検索結果</h4>
            <table border="1">
                <thead>
                <tr>
                    <th>id</th>
                    <th>名前</th>
                    <th>価格</th>
                    <th>個数</th>
                    <th>賞味期限</th>
                </tr>
                </thead>
                <tbody>
                {SearchResults}
                </tbody>
            </table>
            </div>
        )}
        {/* {isEditing && (
        <div>
          <h3>在庫情報編集</h3>
          <form onSubmit={handleonSubmit}>
            <label>
              商品名:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              単価:
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              個数:
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </label>
            <label>
              賞味期限:
              <input type="date" name="exdate" value={formData.exdate} onChange={handleChange} required />
            </label>
            <button type="submit">更新</button>
            <button type="button" onClick={() => setIsEditing(false)}>キャンセル</button> */}
          {/* </form>
        </div>
      )} */}
      
    </div>
  );
}

export default Food;
