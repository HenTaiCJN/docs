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
    print('mqtt已连接')
else:
    print('mqtt未连接')
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



### 传感器-声音传感器
```py
from leight import sound
sd=sound()          # 初始化
sd_value=sd.read()  # 读取值
```

[//]: # (1. 这段代码用于读取声音传感器的值,并且有板载设备,外部接入时需在初始化的括号内填入引脚号)

[//]: # (2. 使用板载设备时,读取的是声音强度&#40;0-4095&#41;;引脚接入的声音传感器为有无声音&#40;0或1&#41;)
1. 这段代码用于读取声音传感器的值,用于检测台灯周围的声音
2. 读取的数值为0或1,表示有无声音


### 传感器-光线传感器
```py
from leight import ldr
l=ldr()             # 初始化
l_value=l.read()    # 读取值
```

[//]: # (1. 这段代码用于读取光线传感器的值,并且有板载设备,外部接入时需在初始化的括号内填入引脚号)

[//]: # (2. 无论板载还是外部,读取的都是光线强度&#40;0-4095&#41;;)

1. 这段代码用于读取光线传感器的值,用于检测台灯周围的环境亮度
2. 值为光线强度,值的范围在0-4095



### 传感器-霍尔传感器
```py
from leight import hall
hl=hall()       # 初始化
v=hl.read()     # 读取值 
```
1. 这段代码用于读取霍尔传感器的值,用于检测台灯是否吸附在灯座上
2. 读取的数值为0或1,1表示吸上灯座



### 传感器-人体雷达
```py
from leight import radar
rd=radar()          # 初始化
rd_value=hl.read()  # 读取值
```
1. 这段代码用于读取人体雷达的值,用于检测台灯周围是否有人
2. 读取的数值为0或1,1表示周围是有人
3. 人体雷达较为灵敏,一般需要人走出房间关上门才不会被检测到



### 传感器-灯光
```py
from leight import led

lightness=led.get_lightness()
```
1. 这段代码用于读取台灯当前的亮度
2. 读取的数值范围在0-100



### 传感器-按键
```py
from button_action import touch

def mybtn:
	'''编写自定义按钮功能'''
touch.action_change('touch1_click',mybtn) # 自定义A键单击
```
1. 这段代码用于自定义台灯按键的功能
2. 第一个参数代表按键类型,第二个参数代表该按键类型触发后要执行的函数名
3. 程序运行后,新定义的按键事件会覆盖默认的事件,没有新定义的会保持默认事件
4. 按键类型见下表

| 类型     | 参数               |
|--------|------------------|
| A键单击   | touch1_click     |
| A键双击   | touch1_dclick    |
| A键长按   | touch1_longClick |
| B键单击   | touch2_click     |
| B键双击   | touch2_dclick    |
| B键长按   | touch2_longClick |
| A键滑到B键 | touch1_to_touch2 |
| B键滑到A键 | touch2_to_touch1 |
* 示例
```py
from button_action import touch

def mybtn:
    print('A按键长按')
def mybtn2:
    print('B按键双击')
touch.action_change('touch1_longClick',mybtn)
touch.action_change('touch2_dclick',mybtn2)
```



### 传感器-语音
```py
from leight import voice

def voice_01_bind():
	'''自定义语音功能'''
voice.bind('01',voice_01_bind) # 绑定‘开灯’语音指令的函数
```
1. 这段代码用于自定义语音指令
2. 第一个参数代表语音类型,第二个参数代表该语音触发后要执行的函数名
3. 程序运行后,新定义的语音事件会覆盖默认的事件,没有新定义的会保持默认事件
4. 按键类型见下表

| 类型 | 语音指令  |
|----|-------|
| 00 | 关灯    |
| 01 | 开灯    |
| 02 | 调亮    |
| 03 | 调暗    |
| 04 | 嘛咪嘛咪哄 |
| 05 | 急急如律令 |
| 06 | 巴拉巴拉  |
| 07 | 玛卡巴卡  |
* 示例
```py
from button_action import touch

def mybtn:
    print('A按键长按')
def mybtn2:
    print('B按键双击')
touch.action_change('touch1_longClick',mybtn)
touch.action_change('touch2_dclick',mybtn2)
```



### 执行器-蜂鸣器
```py
from leight import speaker
speaker.tone(freq=[1000,1500],dual=1000)
```
1. 这段代码用于使用蜂鸣器
2. freq参数为列表,代表声音频率
3. dual代表声音持续时间,单位为毫秒
4. 这段代码是阻塞的



### 执行器-RGB灯带
```py
from leight import rgb

rgb.write(index=[0,1,2],r=255,g=0,b=0)
```
1. 这段代码用于改变rgb灯的颜色
2. index参数为列表,列表内填入rgb灯的序号
3. r,g,b这三个参数来控制颜色,范围0到255

* 示例
```py
from leight import rgb
import time
rgb.write(index=[0,1,2],r=255,g=0,b=0)  # 设置0,1,2号rgb灯为红色
time.sleep(1)                           # 休眠一秒
rgb.write(index=[1,2],r=0,g=0,b=255)    # 单独设置1,2号rgb灯为蓝色
time.sleep(1)                           # 休眠一秒
rgb.write(index=[0],r=0,g=0,b=0)        # 单独关闭0号rgb灯
rgb.write(index=[1],r=0,g=255,b=0)      # 单独设置1号rgb灯为绿色

```



### 执行器-台灯-开/关灯
```py
from leight import led
led.on()
led.off()
```
1. 这段代码中,led.on()用于开灯,led.off()用于关灯
2. 开关灯自带动画,同时也具有清屏效果(灯珠全亮).



### 执行器-投射字符-单个字符
```py
from leight import char
char.display('a')
```
1. 这段代码用于投射单个字符(大小写英文字母和数字)
* 示例
```py
from leight import char
import time
char.display('L')
time.sleep(0.5)     # 休眠一秒
char.display('O')
time.sleep(0.5)     # 休眠一秒
char.display('V')
time.sleep(0.5)     # 休眠一秒
char.display('E')
# 整体效果:将LOVE四个字母投射,间隔0.5秒
```



### 执行器-投射字符-走马灯
```py
from leight import carousel
crl=carousel()         # 初始化走马灯
crl.loop('WELCOME',10) # 投射WELCOME，速度为10
crl.stop()             # 停止走马灯

```
1. 这段代码用于投射走马灯
2. 投射之后会一直循环播放,直到使用停止函数
3. 跑马灯是非阻塞的
* 示例
```py
from leight import carousel,char
import time
crl=carousel()         # 初始化走马灯
crl.loop('WELCOME',10) # 投射WELCOME，速度为10
time.sleep(10)         # 休眠十秒
crl.stop()             # 停止走马灯
char.display('A')      # 投射字符A
```



### 广播-初始化
```py
from leight import radio
r=radio()

```
1. 这段代码用于初始化广播模块,需要在括号内填入数字识别码
2. 识别码由自己定义,发送端和接收端的识别码相同时才能收发消息
3. 设备无法既发送又接收,只能选择其一
* 示例
```py
from leight import radio
r=radio(123)
```



### 广播-启动/关闭
```py
from leight import radio
r.on()

r.off()
```
1. 这两段代码用于开启和关闭radio
2. 一般情况下,初始化radio时会自动启动,不需要手动开启



### 广播-发送消息
```py
from leight import radio

r.send('hello world')
```
1. 这段代码用于广播消息
2. 发送前需要初始化,并且发送端不会接收自己广播的消息



### 广播-接收消息
```py
from leight import radio

msg=r.recv()
```
1. 这段代码用于接收广播的消息
2. 发送前需要初始化,并且发送端不会接收自己广播的消息
3. 接收消息的函数只会接收最新的消息,否则返回None.为了避免资源浪费,建议搭配监听消息的函数使用



### 广播-监听消息
```py
from leight import radio

def radio_callback():
	'''编写收到消息后做什么'''

r.setcb(radio_callback)
```
1. 这段代码用于监听广播是否接收到新消息
2. 在setcb的括号中填入收到新消息后要执行的函数名

* 示例
```py
from leight import radio

def radio_callback():
	'''编写收到消息后做什么'''
	msg=r.recv()            # 读取消息并赋值给变量msg
	print(msg)              # 打印msg
r=radio(123)
r.setcb(radio_callback)     # 设置radio_callback为收到消息后要执行的函数
```



### 时间-同步时间
```py
import RTC
import ntptime

'''开始同步时间(须开启wifi)'''
ntptime.host='cn.pool.ntp.org'
ntptime.settime()
(year, month, day, weekday, hours, minutes, seconds, subseconds) = RTC().datetime()
RTC().datetime((year, month, day, weekday, hours+8, minutes, seconds, subseconds))
'''同步时间结束'''
```
1. 这段代码用于与服务器同步当前时间
2. 同步之前需要先连接wifi,如果网络质量不好,可能会导致同步失败,失败的话可以多次尝试
3. 同步的时间为+8时区



### 时间-当前时间
```py
import time
now_time=f'{time.localtime()[0]}年{time.localtime()[1]}月{time.localtime()[2]}日 {time.localtime()[3]}:{time.localtime()[4]}:{time.localtime()[5]}'
```
1. 这段代码用于获取设备中的时钟并格式化赋值给now_time
2. time.localtime()所获的是一个包含当前时间信息的列表.这段当前时间模块拖放后是已经处理好的代码



### 时间-当前时间
```py
import time
import _thread
def alarm_callback(h,m):
	while True:
		if time.localtime()[3] == h and time.localtime()[4] == m:
			'''到时间后做什么'''
			break # 做完后解除闹钟
		time.sleep(1)
_thread.start_new_thread(alarm_callback, [15, 2]) #设置15点02分时的闹钟
```
1. 这段代码用于设置定时闹钟
2. _thread.start_new_thread中第二个参数为列表,列表的第一和第二个元素分别代表几时几分.
3. 设置闹钟前建议先同步时间



### 时间-定时器
```py
from machine import Timer

def Timer_callback(e):
	'''定时循环做什么'''
Timer(3).init(period=1000,mode=Timer.PERIODIC,callback=Timer_callback) # 每1000毫秒执行一次Timer_callback
```
1. 这段代码用于设置定时器以固定时间间隔执行代码
2. 将想要重复执行的代码写入Timer_callback函数中
3. period为定时器的时间间隔设置,单位是毫秒
4. 可使用的定时器有三个,Timer(1),Timer(2),Timer(3)
5. 一个定时器只能设置一个callback,新的定义会覆盖旧的

















