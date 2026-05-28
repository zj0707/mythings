# Study Manager - 智能学习管理助手

## 项目简介

Study Manager 是一款基于 HarmonyOS NEXT 开发的智能学习管理应用，帮助学生高效管理课程表、作业和学习计划。

## 核心功能

### 1. 课表管理
- 创建一周课程表，支持自定义课程名称、教室、教师、节次
- 按天筛选查看课程安排
- 可视化时间冲突检测

### 2. 作业管理
- 手动输入作业名称、预计完成时间、截止时间
- 进度条显示完成度
- 逾期和紧急作业高亮提醒
- 作业优先级排序

### 3. 智能学习计划
- 根据课表空闲时间自动安排作业任务
- 考虑学生休息时间（默认 22:00-7:00）
- 自动避让课程时间，填充空闲时段
- 动态调整计划，每日学习时长上限控制

### 4. 学生互动提问
- 检测时间不足时主动向学生提问
- 确认是否调整计划 / 减少任务 / 延长学习时间
- 及时反馈作业截止压力

### 5. 智能警报
- 作业到期前 24 小时发出预警
- 逾期作业紧急提醒
- 系统通知推送
- 计划超负荷时提示

## 工程目录

```
├── AppScope/
│   ├── app.json5                          # 应用配置
│   └── resources/base/element/string.json # 应用名称
├── entry/
│   ├── src/main/ets/
│   │   ├── entryability/
│   │   │   └── EntryAbility.ets           # 程序入口，启动后台监控
│   │   ├── pages/
│   │   │   └── MainPage.ets               # 主页面（4 标签页）
│   │   ├── controller/
│   │   │   ├── ScheduleController.ets     # 课表管理控制器
│   │   │   ├── HomeworkController.ets     # 作业管理控制器
│   │   │   ├── PlanController.ets         # 计划生成控制器
│   │   │   ├── AlertController.ets        # 提醒/警报控制器
│   │   │   └── StudentQuestionsController.ets # 学生互动提问控制器
│   │   ├── model/
│   │   │   ├── Course.ets                 # 课程数据模型
│   │   │   ├── Homework.ets               # 作业数据模型
│   │   │   ├── ScheduleSlot.ets           # 时间槽/计划槽模型
│   │   │   └── StudentProfile.ets         # 学生偏好模型
│   │   ├── common/
│   │   │   ├── constants/
│   │   │   │   └── CommonConstants.ets    # 公共常量
│   │   │   └── utils/
│   │   │       ├── Logger.ets            # 日志工具
│   │   │       └── TimeUtils.ets         # 时间工具
│   │   └── view/                          # 视图组件（内嵌在 MainPage）
│   ├── src/main/resources/
│   │   └── base/profile/main_pages.json   # 页面路由
│   ├── build-profile.json5
│   ├── hvigorfile.ts
│   └── oh-package.json5
├── build-profile.json5
├── hvigorfile.ts
├── oh-package.json5
└── README.md
```

## 架构设计

项目采用 **MVVM / 观察者模式**：

- **Model 层**：`Course`、`Homework`、`ScheduleSlot`、`StudentProfile` 数据模型
- **Controller 层**（全局单例）：业务逻辑与状态管理
  - `ScheduleController` — 课表 CRUD 与冲突检测
  - `HomeworkController` — 作业 CRUD 与优先级排序
  - `PlanController` — 智能计划生成算法
  - `AlertController` — 定时监控与通知
  - `StudentQuestionsController` — 学生提问交互
- **View 层**：`MainPage` 页面包含 4 个标签页

## 智能计划算法

```
1. 获取所有未完成作业，按优先级排序
2. 遍历一周每天：
   a. 标记课程占用的时间槽
   b. 标记休息时间（22:00-7:00）
   c. 在剩余空闲槽位中分配作业
   d. 相邻作业之间插入休息时间
   e. 检查每日学习时长上限（默认 6 小时）
3. 超负荷时触发学生提问
```

## 使用方法

1. 打开应用，在「课表」标签添加课程
2. 在「作业」标签添加作业，设置预计时间和截止日期
3. 切换到「计划」标签，自动显示生成的周计划
4. 查看「提醒」标签了解紧急事项
5. 当时间不够时，应用会弹出提问协助调整

## 运行环境

- **系统**：HarmonyOS 5.1.0 Release 及以上
- **设备**：华为手机、平板
- **IDE**：DevEco Studio 5.1.0 Release 及以上
- **SDK**：HarmonyOS 5.1.0 Release SDK (API 18)

## 权限

| 权限 | 用途 |
|------|------|
| `ohos.permission.INTERNET` | 在线课程识别与语音服务 |
| `ohos.permission.NOTIFICATION_CONTROLLER` | 学习提醒系统通知 |

## 许可证

Apache License 2.0
