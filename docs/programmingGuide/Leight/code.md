# Leight 代码编程指南

本指南为Leight物联网台灯的代码编程指南

## 前言

本指南基于LeLink的Leight版本编写，旨在对代码编程中每个模块的代码进行梳理和解析，
并提供一小段测试案例以供用户实践。

::: warning
该部分，难度较大，适合有一定编程思想的用户使用。要求用户至少有变量、赋值、函数的概念，了解
整形、字符串区别
:::


## 模块详解

### 基本函数-打印
```py
print()
```
<br>

该函数用于在shell上打印数据
* 示例
```py
print(1) #输出 1
print('abc') #输出 abc
print(1+1) #输出 2
```
```py
a=5
print(a) #输出 5
b=2
print(a*b) #输出 10
```



### 基本函数-如果
```py
if <判断条件>:
    '''在此放入要执行的代码'''
```
<br>

1. `if`是一个用于判断的关键字，通过判断条件来决定是否执行下面的代码。
2. 执行的代码需要“缩进”，一级缩进由1个Tab或者4个空格组成。建议保持良好的书写风格，统一使用一种缩进风格。 
3. `if` 可以一次判断多个条件，也可以嵌套，以此来完成复杂的条件判断。
4. <判断条件>的本质是`True`（真、存在、对）和`False`（假、不存在、不对）。列如1+1==2为真，1+1=3为假，1+1!=3为真。
当<判断条件>为`True`时执行代码，为`False`时不执行。
5. `if`也可以直接判断值为`True`或`False`的变量。 
6. <判断条件>中常用的判断符号有：`==`用来检测两侧是否相等（包括变量类型和值)；
`!=`用来检测是否不相等,不相等为`True`,相等为'False''；
`>` `<`用来比较大小；`and`两边都要为`True`；`or`两边有一边为`True`。
* 示例
```py
a=1
b=2
if a+b==2:
    print('right') # 执行
if a+b==3:
    print('right') # 不执行
```
```py
a=1
b='1'
if a==b:
    print('right') # 不执行，因为a和b不是一个类型。
```
```py
a=1
b=2
if a>b:
    print('a>b') # 不执行
if a<b:
    print('a<b') # 执行
```
```py
a=1
b=2
if a>b:
    print('a>b') # 不执行
if a<b:
    print('a<b') # 执行
```
```py
a=1
b=2
if a==1 and b==3:
    print('a等于1 并且 b等于3') # 不执行
if a==1 or b==3:
    print('a等于1 或 b等于3') # 执行
```



### 基本函数-循环
```py
while <循环条件>:
	'''在此放入循环体代码'''
```
<br>

1. `while`是用于循环的关键字，当<循环条件>为`True`时，循环体代码会一直重复运行
2. `while`是循环,所以`while`是阻塞的,循环结束之前不会执行外下的其他代码
3. 循环体的代码一样需要缩进,和[`if`](#基本函数-如果)一样
4. `while`也可以直接判断值为`True`或`False`的变量
5. 当<循环条件>直接填为`True`时,代表一直循环,除非主动使用`break`关键字打断循环
* 示例
```py
a=0
while a!=5:     # 当a等于5的时候a!=5为False,停止循环
    print(a)    # 打印a的值
    a=a+1       # a的值加1
# 效果:shell中输出0,1,2,3,4
```
```py
a=0
while True:         # 循环条件为True,表示一直循环
    if a==10:       # 当a为10的时候主动中断循环
        break
    print(a)        # 打印a的值
    a+=1            # a+=1 等效于 a=a+1
# 效果:shell中输出0到9
```



### 基本函数-数值转字符
```py
str()
```
将数值转化为字符串
* 示例
```py
a=1
b='1'
if a=b:
    print('hello')
if str(a)=b:
    print('world')
# 效果:shell中只输出world
```



### 基本函数-休眠
```py
import time   # 导入time库
time.sleep(1) # 休眠一秒
```
<br>

休眠函数主要用于对整个代码运行流程的控制，以及防止一些性能消耗大的循环体过快多次执行造成性能不足。

:::danger
强烈建议在`while True:`这种死循环的循环体中加入休眠函数，防止程序崩溃
:::
* 示例
```py
import time
print(0)        # 立即执行
time.sleep(1)
print(1)        # 1秒后执行
time.sleep(0.5)
print(1.5)      # 再过0.5秒执行
time.sleep(1)
print(2.5)      # 再过1秒执行。至此，程序结束，总耗时约2.5秒
```



### 网络-wifi初始化
```py
wifi.connect(ssid='wifi名称',psd='wifi密码')
```
1. 这段代码用于连接wifi，在填写wifi名称时需注意大小写、中英文符号。
2. 连接wifi需要几秒时间，如果长时间没反应或shell提示"WLAN Connect Timeout"则表明连接失败，可以尝试重新连接。
3. 仅支持2.4G频段的wifi



### 网络-mqtt-mqtt初始化
::: tip MQTT
mqtt代码中有许多参数需要填写，在此先简单介绍下mqtt的各种概念，方便理解。

* mqtt可以简单理解为是一个聊天群
* 不同的服务器地址代表不同的聊天软件，user、psd为账号密码，client_id是一个不重复的用户名
* topic（主题）则为聊天群的群号，监听topic则可以理解为通过群号加入群聊，加入群聊后方可接收到消息
:::
```py
mqttclient.connect(server='输入服务器地址',port=1883,client_id='',user='',psd='')
```
1. 这段代码用初始化mqtt以连接至mqtt服务器。
2. mqtt平台没有特别说明的情况下，port默认为1883，不必修改，client_id、user、psd为平台提供。
3. server中填入mqtt平台提供的服务器地址，可以是url，也可以是纯ipv4地址。
4. 连接mqtt之前须开启wifi，连接失败的情况可能是且不仅为：wifi未开启、wifi信号弱或不稳定、mqtt服务器繁忙

:::tip 服务器地址
正确格式：`cloud.leihoorobot.com`或`114.55.174.158`<br>
错误格式：`https://cloud.leihoorobot.com/`
:::
* 示例
```py
from leight import mqttclient,wifi
wifi.connect(ssid='leihoo',psd='lh123456')
mqttclient.connect(server='cloud.leihoorobot.com',port=1883,client_id='zmoakjdq',user='admin',psd='123456')
```



### 网络-mqtt-mqtt状态
```py
from leight import mqttclient
mqttStatus=mqttclient.connected()
```
1. 这段代码用于检测mqtt是否连接，连接时返回True，未连接时返回False
2. 一般情况下不需要使用这段代码，因为固件内部代码有断线重连功能
* 示例
```py
from leight import mqttclient,wifi
wifi.connect(ssid='leihoo',psd='lh123456')
mqttclient.connect(server='cloud.leihoorobot.com',port=1883,client_id='zmoakjdq',user='admin',psd='123456')
mqttStatus=mqttclient.connected()
if mqttStatus:
    print(mqtt已连接)
else:
    print(mqtt未连接)
```



### 网络-mqtt-发送消息
```py
from leight import mqttclient
mqttclient.publish(topic='主题', content= '消息内容')
```
1. 这段代码用于给指定的主题发送消息
2. 使用之前需要先连接wifi和mqtt服务器
3. 如果想要自己也接收到自己发的消息，需要在发送之前先[监听消息](#网络-mqtt-监听消息)
* 示例
```py
from leight import mqttclient,wifi
wifi.connect(ssid='leihoo',psd='lh123456')
mqttclient.connect(server='cloud.leihoorobot.com',port=1883,client_id='zmoakjdq',user='admin',psd='123456')
mqttclient.publish(topic='JTZYU1721202028', content= 'hello wrold')
```


### 网络-mqtt-监听消息
```py
from leight import mqttclient,wifi

def receivedfunction():
	'''编写监听到消息后做什么'''
	
mqttclient.received(topic='监听的主题',callback=receivedfunction)
```
1. 这段代码用于监听mqtt服务器上指定topic是否接收到消息
2. 使用之前需要先连接wifi和mqtt服务器
3. 当接有新消息的时候会自动执行callback参数设置的函数receivedfunction。callback的函数可以自定义
* 示例
```py
from leight import mqttclient,wifi

def receivedfunction():
	print('监听到有新消息')
wifi.connect(ssid='leihoo',psd='lh123456')
mqttclient.connect(server='cloud.leihoorobot.com',port=1883,client_id='zmoakjdq',user='admin',psd='123456')
mqttclient.received(topic='JTZYU1721202028',callback=receivedfunction)
```



### 网络-mqtt-查看消息
```py
from leight import mqttclient
msg=mqttclient.message(topic='主题')
```
1. 这段代码用于从mqtt服务器查看指定topic的最新消息
2. 由于mqtt的特性,新消息不及时接受的话会被自动丢弃掉.所以查看消息的代码需要配合[监听消息](#网络-mqtt-监听消息),以便及时查看消息
* 示例
```py
from leight import mqttclient,wifi
def receivedfunction():
    msg=mqttclient.message(topic='主题')  # 将新消息存储到变量msg中
	print(msg)                           # 打印新消息到shell
mqttclient.connect(server='cloud.leihoorobot.com',port=1883,client_id='zmoakjdq',user='admin',psd='123456')
mqttclient.received(topic='JTZYU1721202028',callback=receivedfunction)
```



### 网络-mqtt-查看消息
```py
from leight import mqttclient
msg=mqttclient.message(topic='主题')
```
1. 这段代码用于从mqtt服务器查看指定topic的最新消息
2. 由于mqtt的特性,新消息不及时接受的话会被自动丢弃掉.所以查看消息的代码需要配合[监听消息](#网络-mqtt-监听消息),以便及时查看消息
* 示例
```py
from leight import mqttclient,wifi
def receivedfunction():
    msg=mqttclient.message(topic='主题')  # 将新消息存储到变量msg中
	print(msg)                           # 打印新消息到shell
mqttclient.connect(server='cloud.leihoorobot.com',port=1883,client_id='zmoakjdq',user='admin',psd='123456')
mqttclient.received(topic='JTZYU1721202028',callback=receivedfunction)
```
