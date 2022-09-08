---
title: "Mac 安装MariaDB问题"
subtitle: "The Problem With Install MariaDB in Mac"
layout: post
author: "Fang Binbin"
header-style: text
hidden: true
tags:
  - 笔记
  - MariaDB
---

## 1.安装问题

- 安装源问题
  
  > 梯子或换源安装
- 预查看mariadb是否安装命令
  
  >  brew info mariadb

- 安装命令（执行不报错即可）
  > brew install mariadb

## 2.配置问题

- 若mysql已经启动状态打开mariadb容易冲突，先关闭mysql。

- 启动命令
  
  ```linux
  mysql.server start
  ```

  返回结果中有： "SUCCESS!" 关键词即可

- 通过上面的启动MariaDB数据库服务，已经可以连接MariaDB的数据库了，但是还不够安全，通过如下步骤可以完成更全面的设置，如：重设root用户的密码、移除匿名用户、移除默认的test数据库等等
  
  > 执行 **mysql_secure_installation** 命令进行设置

  - 初始密码为空，可直接按 ```enter```键进行密码设置
  
- 若之前设置过密码，忘记了可进行如下操作

  - 1.&nbsp; `sudo mysql -u root -p` (若输入密码，通常为电脑密码)

  - 2.&nbsp;
  
    ```linux
    use mysql;
    ```

  - 3.&nbsp;
  
    ```linux
    select User,authentication_string,Host from user;
    ```

  - 4.&nbsp;
  
    ```linux
    drop user root@‘localhost’;
    ```

  - 5.修改密码

    ```linux
    CREATE USER ‘root’@’localhost’ IDENTIFIED BY ‘密码’; 
    ```

  - 6.在navicat或命令行再次连接即可。

## 启动关闭

> 启动:&nbsp;mysql.server start

> 关闭:&nbsp;kill PID
