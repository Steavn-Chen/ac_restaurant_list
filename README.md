# 網路火紅餐廳清單

### 這是一個專門介紹網路上人們熱烈討論,人潮絡繹不絕的餐廳清單,因為網站目前己有初步規模,基本的功能等下會在下方敍述,雖然目前只有八家餐廳在內,相信不久的將來隨著網站功能更新,一定也會有更多的餐廳會加入本網站,提供大家更多美食體騟.


![rejected](https://photos.google.com/photo/AF1QipP4UAkUcdDIiTKbm2BSnGJrao35XCYnSs0RbJEx)

## 開發環境

- Node.js -v10.15.0
- Express -4.17.1
- Express-Handlebars -5.2.1
- Nodemon -2.0.7
- body-parser 1.19.0
- mongoose 5.12.1

## 安裝與執行要點

1.  在本地端建立專案資料夾 .

```
   mkdir restaurant_list
```

2.  將專案下載到專案資料夾並進入資料夾.

```
   cd restaurant_list

3. 安裝npm.
```

       npm install

```
4. 安裝種子檔案.
```

       npm run seed

```
5. 啓動伺服器.
```

       npm run dev

6. 觀察終端機輸出的訊息,是否成功開啓伺服器.

```

       Expredd is listening on localhost: 3000

## 現下功能

- 根擄使用者在搜尋欄輸入關鍵字,找到餐廳名字有相關字的餐廳.
- 在餐廳圖片點擊,切換至該餐廳特定介面,裡面有更詳盡的餐廳資訊.
- 使用者可以新增,刪除,修改餐廳資訊功能
```
