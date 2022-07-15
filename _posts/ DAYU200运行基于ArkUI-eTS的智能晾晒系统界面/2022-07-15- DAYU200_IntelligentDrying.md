---
layout: post
title: DAYU200运行基于ArkUI-eTS的智能晾晒系统界面
subtitle: "IntelligentDrying System Page with ArkUI-eTS"
author: "FangBinBin"
header-img: "img/IntelligentDrying/IntelligentDrying.jpg"
header-mask: 0.4
tags:
  - OpenHarmony
  - ArkUI-eTS
---

# 背景
ArkUI-eTS目前已经能够多种设备运行，同时也为我们提供了越来越丰富的组件和硬件开发能力。本次主要是写一个智能晾晒系统的页面来在DAYU200上面进行运行测试。

eTS入门或获取eTS官方API文档可参照本人另外帖子：[ArkUI_eTS手把手入门](https://ost.51cto.com/posts/10130)
# 开发环境
DevEco Studio for OpenHarmony3.0.0.900

OpenHarmony版本：3.1_Release

开发板：DAYU200 ( 基于openHarmony3.1_Release版本 )
# 具体开发过程
## 1.新建工程

![QQ截图20220702000433.png](https://dl-harmonyos.51cto.com/images/202207/19f5cef81899b1a1ea5118b90aca9f51514381.png?x-oss-process=image/resize,w_820,h_761)

![QQ截图20220702001148.png](https://dl-harmonyos.51cto.com/images/202207/99d2aa696509398f7b1820984376eab37a7ef4.png?x-oss-process=image/resize,w_820,h_761)

创建工程完成后，工程目录如下：

![QQ截图20220702001400.png](https://dl-harmonyos.51cto.com/images/202207/086eded94eb509dc90918877313e6024668077.png?x-oss-process=image/resize,w_437,h_466)

随后，需在“MainAbility”目录下创建“image”目录用于存放部分页面素材资源。
（右击“MainAbility”文件名-“New”-“Directory”-输入“image”进行创建）

![QQ截图20220702001635.png](https://dl-harmonyos.51cto.com/images/202207/07e4f3a7149029b10c1472a17c05002dc84665.png?x-oss-process=image/resize,w_820,h_301)

![QQ截图20220702001655.png](https://dl-harmonyos.51cto.com/images/202207/236361a522d4968def11451d56b17475ba45e5.png?x-oss-process=image/resize,w_610,h_179)

创建完成后，工程目录结构如下：(同时我们知道“image”目录和“resources-base-media”均可存放部分素材资源)

![QQ截图20220702001818.png](https://dl-harmonyos.51cto.com/images/202207/860a73f4531b60072c8221a54f476ba669327d.png?x-oss-process=image/resize,w_423,h_435)

## 2.页面结构设计

主页面结构：

![截屏20220703 10.25.18.png](https://dl-harmonyos.51cto.com/images/202207/41461656015a17f78d2036a5005b84725c0af8.png?x-oss-process=image/resize,w_734,h_1316)

副页面结构：

![截屏20220703 10.39.00.png](https://dl-harmonyos.51cto.com/images/202207/76c98c659879814b34f0308a83064c52df100c.png?x-oss-process=image/resize,w_720,h_1316)

## 3.代码结构

```javascript
......
  build() {
    Column() {
      Tabs() {
        TabContent() {
          Column() {
            Flex() {
              Text('天气 : ' + this.weather)
              Text('温度 : ' + this.temp + ' ℃')
              Text('湿度 : ' + this.humidity + ' RH')
            }

            Flex() {
              Text(this.sub)   # 环境情况
            }
	    // 1
            Row({ space: 2 }) {
              Button() {
                Column() {
                  Text('晾晒状态')
		  Image($r("app.media.drying"))
                }
              }
              Button() {
                Column() {
                  Text('手动调节')
                  Image($r("app.media.hand"))
                }
              }
            }
            // 2
            Row({ space: 2 }) {
              Button() {
                Column() {
                  Text('时间统计')
                  Image($r("app.media.time"))
                }
              }
              Button() {
                Column() {
                  Text('我的设备')
                  Image($r("app.media.IoT"))
                }
              }
            }
            // 3
            Row({ space: 2 }) {
              Button() {
                Column() {
                  Text('定时提醒')
                  Image($r("app.media.clock"))
                }
              }
            }
          }
        }.tabBar({ icon: ("/image/home.png"), text: '首页' })
        .backgroundImage('/image/background.jpg', ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)

        TabContent() {
          Column() {
            Flex() {
              Row({ space: 2 }) {
                Image('/image/user.png')
                Text(this.user_name)
              }
              Image('/image/message.png')
            }

            Flex() {
              Flex(){
                Row({ space: 2 }) {
                  Image('/image/mech.png')
                  Text('我的设备')
                }

                Image('/image/right.png')
              }

              Flex(){
                Row({ space: 2 }) {
                  Image('/image/set.png')
                  Text('设置')
                }.width('50%').height(50)

                Image('/image/right.png')
              }
              Flex(){
                Row({ space: 2 }) {
                  Image('/image/change_user.png')
                  Text('切换用户')
                }

                Image('/image/right.png')
              }.width('90%').height(50).margin({top:10})

              Flex(){
                Row({ space: 2 }) {
                  Image('/image/help.png')
                  Text('反馈与建议')
                }
                Image('/image/right.png')
              }
            }
          }
        }.tabBar({ icon: $r("app.media.me"), text: '个人' })
      }
    }
  }
......
```
## 4.完整代码

```javascript
// @ts-nocheck
@Entry
@Component
struct Index {
  private controller: TabsController = new TabsController()
  private weather: string = '晴'
  private temp: number = 20.6
  private humidity: number = 30
  private sub: string = '适合晒衣'
  private user_name: string = 'Cool_breeze'

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
        TabContent() {
          Column() {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center }) {
              Text('天气 : ' + this.weather)
                .fontSize(30)
                .fontWeight(FontWeight.Bold)
                .fontColor(Color.White)

              Text('温度 : ' + this.temp + ' ℃')
                .fontSize(30)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 5 })

              Text('湿度 : ' + this.humidity + ' RH')
                .fontSize(30)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 5 })
            }
            .height('25%')
            .width('85%')

            Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
              Text(this.sub)
                .fontSize(30)
            }
            .opacity(0.6)
            .backgroundColor(Color.White)
            .width('90%')
            .height(70)
            .borderRadius(10)

            Row({ space: 2 }) {
              Button({ type: ButtonType.Normal }) {
                Column() {
                  Text('晾晒状态')
                    .fontSize(20)
                  Image($r("app.media.drying"))
                    .width(50)
                    .height(50)
                    .margin({ top: 10 })
                }
              }
              .height('100%')
              .width('48%')
              .borderRadius(30)
              .backgroundColor(Color.White)
              .margin({ right: 15 })

              Button({ type: ButtonType.Normal }) {
                Column() {
                  Text('手动调节')
                    .fontSize(20)
                  Image($r("app.media.hand"))
                    .width(50)
                    .height(50)
                    .margin({ top: 10 })
                }
              }
              .height('100%')
              .width('48%')
              .borderRadius(30)
              .backgroundColor(Color.White)
            }
            .width('90%')
            .height(180)
            .margin({ left: 10, top: 10})
            //2
            Row({ space: 2 }) {
              Button({ type: ButtonType.Normal }) {
                Column() {
                  Text('时间统计')
                    .fontSize(20)
                  Image($r("app.media.time"))
                    .width(50)
                    .height(50)
                    .margin({ top: 10 })
                }
              }
              .height('100%')
              .width('48%')
              .borderRadius(30)
              .backgroundColor(Color.White)
              .margin({ right: 15 })

              Button({ type: ButtonType.Normal }) {
                Column() {
                  Text('我的设备')
                    .fontSize(20)
                  Image($r("app.media.IoT"))
                    .width(50)
                    .height(50)
                    .margin({ top: 10 })
                }
              }
              .height('100%')
              .width('48%')
              .borderRadius(30)
              .backgroundColor(Color.White)
            }
            .width('90%')
            .height(180)
            .margin({ top: 15, left: '10' })
            //3
            Row({ space: 2 }) {
              Button({ type: ButtonType.Normal }) {
                Column() {
                  Text('定时提醒')
                    .fontSize(20)
                  Image($r("app.media.clock"))
                    .width(50)
                    .height(50)
                    .margin({ top: 10 })
                }
              }
              .height('100%')
              .width('48%')
              .borderRadius(30)
              .backgroundColor(Color.White)
              .margin({ right: 15 })

            }
            .width('90%')
            .height(180)
            .margin({ top: 15, left: '10' })
          }

          .height('100%')
          .width('100%')
        }.tabBar({ icon: ("/image/home.png"), text: '首页' })
        .backgroundImage('/image/background.jpg', ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)

        TabContent() {
          Column() {
            Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }) {
              Row({ space: 2 }) {
                Image('/image/user.png')
                  .clip(new Circle({ width: 50, height: 50 }))
                  .width(50)
                  .height(50)
                  .backgroundColor('#dbdb00')
                  .margin({ left: 5 })
                Text(this.user_name)
                  .fontSize(20)
                  .margin({ left: 5 })
              }.width('50%').height(50)

              Image('/image/message.png')
                .height(40)
                .width(50)
                .margin({ right: 5 })
            }
            .width('90%')
            .height(60)
            .margin({top:10})

            Flex({direction: FlexDirection.Column,alignItems:ItemAlign.Center}) {
              Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }){
                Row({ space: 2 }) {
                  Image('/image/mech.png')
                    .width(30)
                    .height(30)
                    .margin({ left: 5 })
                  Text('我的设备')
                    .fontSize(20)
                    .margin({ left: 10 })
                }.width('50%').height(50)

                Image('/image/right.png')
                  .height(20)
                  .width(15)
                  .margin({ right: 5 })
              }.width('90%').height(50).margin({top:30})

              Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }){
                Row({ space: 2 }) {
                  Image('/image/set.png')
                    .width(30)
                    .height(30)
                    .margin({ left: 5 })
                  Text('设置')
                    .fontSize(20)
                    .margin({ left: 10 })
                }.width('50%').height(50)

                Image('/image/right.png')
                  .height(20)
                  .width(15)
                  .margin({ right: 5 })
              }.width('90%').height(50).margin({top:10})
              Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }){
                Row({ space: 2 }) {
                  Image('/image/change_user.png')
                    .width(30)
                    .height(30)
                    .margin({ left: 5 })
                  Text('切换用户')
                    .fontSize(20)
                    .margin({ left: 10 })
                }.width('50%').height(50)

                Image('/image/right.png')
                  .height(20)
                  .width(15)
                  .margin({ right: 5 })
              }.width('90%').height(50).margin({top:10})

              Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }){
                Row({ space: 2 }) {
                  Image('/image/help.png')
                    .width(30)
                    .height(30)
                    .margin({ left: 5 })
                  Text('反馈与建议')
                    .fontSize(20)
                    .margin({ left: 10 })
                }.width('50%').height(50)

                Image('/image/right.png')
                  .height(20)
                  .width(15)
                  .margin({ right: 5 })
              }.width('90%').height(50).margin({top:10})
            }
            .height('50%')
            .width('100%')
            .borderRadius(20)
            .margin({top:10})
            .backgroundColor(Color.White)
          }
          .height('100%')
          .width('100%')
        }.tabBar({ icon: $r("app.media.me"), text: '个人' })
      }
      .vertical(false)
      .barWidth(300)
      .barHeight(60)
      .backgroundColor('#eeeeee')
      .width('100%')
    }
    .width('100%')
    .height('100%')
  }
}
```
## 5.所用部分素材
背景素材：

![background.jpg](https://dl-harmonyos.51cto.com/images/202207/729201d62dcdf605e41529b71f51753de672eb.jpg?x-oss-process=image/resize,w_820,h_2087)
## 6.Previewer预览效果

![image.png](https://dl-harmonyos.51cto.com/images/202207/f9c31309152d193e967481de2e5bea04b55a07.png?x-oss-process=image/resize,w_302,h_609)![image.png](https://dl-harmonyos.51cto.com/images/202207/c4033e8000d571d62cf866524ce466db657958.png?x-oss-process=image/resize,w_300,h_605)
# DAYU200运行效果

![743D191E10EC7F0F1C851532E951466D.jpg](https://dl-harmonyos.51cto.com/images/202207/435ebd6941ccc0902cc10880c4c850d3d23d70.jpg?x-oss-process=image/resize,w_820,h_1920)
![7CE4C04AB2FE3B94818039E7EC6C86AF.jpg](https://dl-harmonyos.51cto.com/images/202207/a52857b7681863eb633176f24dc5ef898a885e.jpg?x-oss-process=image/resize,w_820,h_1920)
![89DFF3350BD6420358FB9A104480F695.jpg](https://dl-harmonyos.51cto.com/images/202207/d55361263226a99e6db082bebd263d2c7d69d9.jpg?x-oss-process=image/resize,w_820,h_1920)

# gitee地址

[原始版本入口](https://gitee.com/openharmony-sig/knowledge_demo_smart_home/tree/master/FA/IntelligentAiring)

[DAYU200版本入口](https://gitee.com/hihope_iot/dayu200_demo/tree/master/%23DAYU200%E4%BD%93%E9%AA%8C%E5%AE%98%23DAYU200%E8%BF%90%E8%A1%8C%E5%9F%BA%E4%BA%8EArkUI-eTS%E7%9A%84%E6%99%BA%E8%83%BD%E6%99%BE%E6%99%92%E7%B3%BB%E7%BB%9F%E7%95%8C%E9%9D%A2)
# 演示视频

[https://ost.51cto.com/show/14309](https://ost.51cto.com/show/14309)
# 后续开发计划

基于此晾晒系统界面和DAYU200开发板，

 （1）连接Hi3861智能家居套件获取真实环境数据；

（2）调用天气API，使DAYU200联网后能够实时获取天气预报信息，从而更好的实现晾晒功能；

（3）若DAYU200本身摄像头条件不允许，可连外接摄像头或利用Hi3516 AI Camera开发套件的功能更加智能的实时监控衣物晾晒状态。

（4）同时除了硬件功能完善，也要对软件部分兼容性和功能进行升级，不仅能够将程序运行在DAYU200开发板上，也能够在所有HarmonyOS设备上运行。