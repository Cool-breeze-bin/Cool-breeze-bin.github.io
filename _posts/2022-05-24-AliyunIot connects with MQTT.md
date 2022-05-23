---
layout: post
title:  阿里云设备与MQTT.fx进行连接)
subtitle: "AliyunIot connects with MQTT"
author: "BinBin"
header-img: "/img/mqtt/background.jpg"
header-mask: 0.4
tags:
  - MQTT
  - Iot
---



# 访问阿里云官网
[https://www.aliyun.com/](https://www.aliyun.com/)

- 先进行账号注册或登录
- 登录成功后，点击右上角旁边的“控制台”
- 进入控制台后，点击左上角“产品与服务”，找到下图所示的“物联网平台”，点击进入。
![](/img/mqtt/Iot-home.png)

![](/img/mqtt/iot-home2.png)
# 创建设备模型
![](/img/mqtt/createmodel.png)

创建设备参数设置如下（完成下图中操作后，确认即可）：
![](/img/mqtt/createsetting.png)

随后添加设备：
![](/img/mqtt/addservice.png)

![](/img/mqtt/addservice1.png)
# 配置设备相关参数
## 设置默认物模型
进入“产品”，查看刚刚创建的设备，并进行功能定义
![](/img/mqtt/checkservice.png)

![](/img/mqtt/setservice.png)

添加标准功能（接收的数据类型）：
![](/img/mqtt/setmodel.png)

![](/img/mqtt/addspeed.png)
## 发布物模型
![](/img/mqtt/pulish1.png)

![](/img/mqtt/pulish2.png)
# 使用MQTT.fx连接并激活设备

>打开MQTT.fx
![](/img/mqtt/mqttadd.png)

点击左下角加号，新建一个连接。
![](/img/mqtt/mqttset.png)

>除“Profile Name”外，其他参数均需在上面的控制台中获取
## Broker Address获取
![](/img/mqtt/checkmqtt.png)

![](/img/mqtt/connectmqtt.png)

下面参数一一对应即可，之后点击“ok”
![](/img/mqtt/mqttsettings.png)

## 连接
点击“connect”进行连接,右上角显示绿点即为连接成功
![](/img/mqtt/mqttconnect.png)

返回控制台刷新验证
![](/img/mqtt/yanzheng.png)

## 通信实现
在控制台产品详情页面查看topic属性上报的类，如下图
![](/img/mqtt/checktopic.png)

将具有发布权限的Topic类复制到下图MQTT.fx相关位置,并打开设备详情页将“DeviceName”也复制到相应位置，进行订阅
![](/img/mqtt/copy1.png)

![](/img/mqtt/copy2.png)

![](/img/mqtt/sub.png)

## 信息上行
将上一步的Topic复制到Pulish中相应位置，用于后面将数据发送到云端
![](/img/mqtt/publishset.png)

最后，就是发送指定格式的数据至云端

查看物模型数据格式
![](/img/mqtt/veh.png)

设置发送的数据，并发送
![](/img/mqtt/publishtext.png)
## 结果
>进入设备详情页查看接收到的数据，如下

![](/img/mqtt/checkout.png)
----

**成功！！**