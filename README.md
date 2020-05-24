# 廣治的記帳本

一個簡單的記帳app，可以將支出分門別類的紀錄

![image alt](./views/1.png)

## 安裝

- 開啟終端機，輸入
```
git clone https://github.com/marcho001/expenseTracker.git
```
- 進入資料夾安裝套件
```
npm install
```
- 執行種子程式
```
npm run seed
```
- 執行程式
```
npm run dev
```

## 功能

- 可以在首頁瀏覽所有花費
- 總存款為 80000元，千萬別把預算花完了！
- 可以看到自動加總後的總支出
- 可以選擇類別查看類別支出
- 可以編輯一筆支出
- 可以刪除一筆支出
- 可以新增支出

## 工具
- Node.js
- Express
- Express-handlebars
- Bootstrap
- body-parser
- Mongodb
- Mongoose
- method-override