---
layout: post
title:  曼哈顿距离
subtitle: "Manhattan Distance"
author: "BinBin"
header-img: "img/K-Means/background.jpg"
header-mask: 0.4
tags:
  - 机器学习
  - Python
---


## 数学理论

> 绿色代表欧氏距离(直线距离)。

>红线代表曼哈顿距离，蓝色和黄色是等价的曼哈顿距离。

![png](/img/Manhattan_Distance/Manhattan%20Distance.png)

曼哈顿距离在2维平面是两点在纵轴上的距离加上在横轴上的距离，即：

![matg1](/img/Manhattan_Distance/Manhattan%20Distance_Math1.png)

- 曼哈顿距离不是距离不变量，当坐标轴变动时，点间的距离就会不同。

n维空间中的欧式(欧几里得，Euclidean Distance)距离：

![Euclidean Distance](/img/Manhattan_Distance/Euclidean%20Distance.png)

## 曼哈顿距离的Python实现

```python
def ManhattanDistance(x, y):
    import numpy as np
    x = np.array(x)
    y = np.array(y)
    return np.sum(np.abs(x-y))
```
