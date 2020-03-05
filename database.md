## 数据库mongodb

###### User表

``` 
var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: { 
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
```

  利用所掌握的程序设计工具设计一个“现代电视用户管理系统“在功能上分用户信息管理（InformationM），节目管理（ProgramM），报表管理（ReportM），设备管理(EquipmentM)和收费管理(tallM)五个模块。对管理员和一般用户都能作用，但他们的操作权限应不同。

    通过对数字电视管理信息的分析，利用数据库的管理与操作工具设计一个数字电视用户管理系统，通过登录界面，以管理员身份登录系统后能够实现各种信息的录入、编辑、修改、查询，对系统进行维护。普通用户通过登录界面输入账号和密码进行身份认证后，能够查询特定用户费用与缴费。

##### 系统主页菜单表

* 信息管理 users

|  字段名 | type  |  required  | default | avatar | gender |status|birthday|
|  ----  | ----  | ---- |----|----|----|----|---|
| type  | 单元格 |  |  |  | | | |
| required | 单元格 |  |  |  | | | |
| default  | 单元格 |  |  |  | | | |
| avatar  | 单元格 |  |  |  | | | |
| gender  | 单元格 |  |  |  | | | |
| status  | 单元格 |  |  |  | | | |
| status  | 单元格 |  |  |  | | | |

* 节目管理 ProgramM

* 报表管理 ReportM

* 设备管理 EquipmentM
* 收费管理 tallM

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |

