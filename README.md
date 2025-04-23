# SWC
# 安装及使用
## 克隆代码仓库：
```bash
git clone https://github.com/emiya-omega/SWC.git
```


## 安装环境及依赖：
```bash
#apt install mariadb-server nodejs
#cd ~/SWC
#npm install 
#npm install -g forever
```
## 启动数据库
```bash
#systemctl enable mariadb
#systemctl start mariadb
```
## 配置数据库
```bash
#mariadb -u root -p  
>>source ~/SWC/init.sql
mysql_secure_installation
```

在server.js	中修改连接池
## 启动服务器：
```bash
cd ~/SWC
#forever start server.js
```
## 默认安装
访问http://localhost:3000
## 典型使用流程
1. 用户注册并登录。
2. 进入对话页面，与AI互动。
3. 访问故事页面，体验互动式童话故事。