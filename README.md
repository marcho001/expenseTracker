# 廣治的記帳本

一個簡單的記帳app，可以將支出分門別類的紀錄

![image alt](./views/2.png)

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

- 可以擁有個人帳號和個人的記帳本
- 可以透過facebook 第三方登入
- 可以在首頁瀏覽所有花費
- 總存款為 80000元，千萬別把預算花完了！
- 可以看到自動加總後的總支出
- 可以篩選類別和月份
- 可以編輯一筆支出
- 可以刪除一筆支出
- 可以新增支出

## 工具
- Node.js
- Bootstrap
- Mongodb
- bcryptjs 2.4.3
- body-parser  1.19.0
- connect-flash  0.1.1
- dotenv  8.2.0
- express  4.17.1
- express-handlebars  4.0.4
- express-session  1.17.1
- method-override  3.0.0
- mongoose  5.9.15
- passport  0.4.1
- passport-facebook  3.0.0
- passport-local  1.0.0