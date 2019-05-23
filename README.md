# Logger

暂时仅用于Client端的日志输出库

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Install

npm install @i11cn/logger --save

## Usage

1. 获取/创建一个Logger: ```let log = Loggers.getLogger("Sample");```，其中的Logger用名称来区分是否相同，如果不存在指定名称的Logger，则会创建新Logger
2. 配置Logger: ```log.setLevel(...).addAppender(...)...```
3. 使用: ```log.trace("输出字符串");```

## Sample

```
import { Loggers, Logger, LogLevel, Console } from '@i11cn/logger';

class Sample {

    constructor() {
        this.loggers = new Loggers(); // this.loggers 应该是全局的
        this.logger = this.loggers.getLogger("sample");
        let con = new Console();
        con.setLayout("%T %N %L: %M");
        this.logger.setName("SAMPLE").setLevel(LogLevel.ALL).addAppender(con);
    }

    ...

    foo() {
        this.logger.debug("测试日志");
        this.logger.debug("aa", "bb", "cc");
    }
    ...
}
```

## Class Document

### Loggers

1. ```getLogger(name: string): Logger``` 获取指定名称的Logger

### Logger

1. ```setName(string): Logger;``` 设置记录在日志中的日志名称，如果不设置，默认就是getLogger时指定的名称
2. ```on(): Logger;``` 打开日志，日志可以正常记录
3. ```off(): Logger;``` 关闭日志，无论任何Level的日志都不会被记录
4. ```setLevel(number): Logger;``` 设置日志允许记录的最低Level，低于Level的日志被忽略
5. ```addAppender(Appender): Logger;``` 添加日志输出位置
6. ```setTimeLayout(string): Logger;``` 设置时间戳的默认格式，如果Appender中没有设置特定格式，则会使用该默认格式。由于使用的库是date-fns，因此具体的时间戳格式字符串，参考库date-fns中的说明
7. ```setSkipCallstack(n: number): Logger;``` 如果要正确获取记录点的函数名，需要跳过的调用层级（考虑到有可能会有封装）
8. trace、debug、info、log、warning、error、fatal、todo，用来做实际的记录，参数可以接受 字符串、```Map<string, any>```、object、```()=> string```、以及任意数量的any，区别在于字符串、object会直接输出，Map会组织成key=value的字符串输出，```()=> string```会调用该函数产生字符串后输出，任意数量的any类型会以字符串的性质连接起来输出

### Appender

如果需要自己扩展Appender，就需要继承Appender类，实现自己的子类

1. ```output(d: LogData, obj): void``` Logger会调用output来输出内容，LogData是Logger传来的数据，obj是从记录点传来的数据，可以自己检查obj类型后分别处理
2. ```setLayout(layout: string): Appender``` 设置Appender的日志格式，没有共用的默认格式，必须要为每一个Appender设置自己的格式
3. ```setTimeLayout(layout: string): Appender``` 设置Appender所用的时间戳格式
4. ```mapToObj(obj: Map<string, any>): any``` 将Typescript的Map转换成JSON能够识别的object
5. ```protected buildMsg(d: LogData, m: string): string``` 根据Layout、LogData和日志字符串，生成最终需要记录的字符串
6. ```protected write(msg: string): void``` 负责将最终的字符串做实际输出的操作，如果没有特殊需求，只需要重载该方法即可，如果有特殊需求，就需要重载output（比如有一些类型需要特殊处理）

### About Layout

设置输出日志格式的字符串，其中%是转义字符，转义含义如下：

* %T: 该处将打印时间戳，时间戳的格式也可以自定义，参见class Logger中的setTimeLayout函数
* %N: 该处将打印Logger的名称，参见class Logger中的setName函数
* %L: 该处将打印该条日志的级别
* %f: 该处将打印输出日志的函数
* %M: 该处输出日志正文

### Console

输出到浏览器的控制台

### TODO

* 增加输出到HTTP和MQTT服务器
* 增加输出到ELK

## 个人记录

### 生成

在Angular项目的根目录下: ```ng g library @i11cn/logger```

### Build

在Angular项目的根目录下: ```ng build @i11cn/logger```

### Publishing

1. 进入编译后的代码中: ```cd dist/i11cn/logger```
2. 确保npm已经登录: ```npm whoami```
3. 发布: ```npm publish --access=public```

