---
layout: post
title: "在云服务器部署Python定时任务"
subtitle: "Deploy Python Scheduled Tasks in CloudServer"
author: "Fang Binbin"
header-img: "img/linux.jpg"
header-mask: 0.4
tags:
- 笔记
- Python
- CloudServer
---

### 部署前提

> 1.云服务器已安装Python环境

> 2.cornd服务已安装 (安装命令: ```yum install crontabs```)

> 3.服务操作

```python
/sbin/service crond start //启动服务
/sbin/service crond stop //关闭服务
/sbin/service crond restart //重启服务
/sbin/service crond reload //重新载入配置

service crond start   //手动启动服务
```

> 4.查看crontab服务状态

```python
service crond status
```

> 5.查看crontab是否开机自启动

```python
ntsysv
```

> 6.加入开机自启动

```python
chkconfig –level 35 crond on
```

### 主要操作

#### 1.查看当前运行的任务

```python
crontab -l
```

#### 2.配置定时任务(适用于所有命令的执行)

```python
 crontab -e
```

- 配置参数

> 执行频率(min、hour、day、month、week) 要执行的命令

|*|*|*|*|*|.../bin/python3|.../project.py|>>|.../project_name.log|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|分钟|小时|天|月|周|python编译器路径|要执行的python工程路径|-|执行日志缓存路径(即Python工程中打印的内容)|

- 时间表示

|格式举例|说明|
|:-:|:-:|
|\* \* \* \* \*|每分分钟执行一次|
|5 \* \* \* \*|每小时05分执行一次|
|5 \*/1 \* \* \*|每小时05分执行一次|
|\*/5 \* \* \* \*|每五分钟执行一次|
|5 \*/2 \* \* \*|每2小时的第五分钟执行一次|
|5 9-11 \* \* 2|每周二9点-11点05分执行一次|
|后面三个 ``` * ```，    天、月、周|也如上|

- 实际举例

![crontab-l](/img/notebook/crontab-l.png)

#### 3.删除所有定时任务

```python
crontab -r
```
