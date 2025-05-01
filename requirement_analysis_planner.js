/**
 * 需求分析与规划阶段MCP工具核心模型
 * 
 * 该模块包含需求分析与规划阶段的核心数据结构、工作流定义、
 * 思维工具模板和对话指导问题等基础组件。
 * 
 * @author 敏捷超级个体实践团队
 * @version 1.0.0
 */

/**
 * 需求分析与规划阶段工作流和资源定义
 */
const RequirementAnalysisPhase = {
  /**
   * 工作流定义
   */
  workflow: {
    name: '需求分析与规划阶段',
    description: '结构化的需求获取、分析、优先级排序和迭代规划流程',
    steps: [
      {
        id: 'business_objectives',
        name: '业务目标获取与分析',
        description: '明确项目业务目标、价值主张和成功度量标准',
        outputs: ['business_objectives_document']
      },
      {
        id: 'user_stories',
        name: '用户故事收集与编写',
        description: '识别用户角色，收集和编写符合INVEST原则的用户故事',
        outputs: ['user_stories_document']
      },
      {
        id: 'domain_model',
        name: '领域模型构建',
        description: '建立业务领域的概念模型，定义核心实体、关系和术语',
        outputs: ['domain_model_document', 'glossary_document']
      },
      {
        id: 'prioritization',
        name: '需求优先级排序',
        description: '基于业务价值和实现复杂度对需求进行优先级排序',
        outputs: ['prioritization_document']
      },
      {
        id: 'iteration_planning',
        name: '迭代计划制定',
        description: '将需求组织成可交付的迭代，制定初步的开发路线图',
        outputs: ['iteration_plan_document', 'roadmap_document']
      },
      {
        id: 'environment_setup',
        name: '开发环境准备',
        description: '规划和准备开发、测试和部署环境',
        outputs: ['environment_setup_document']
      }
    ]
  },
  
  /**
   * 任务列表
   */
  tasks: [
    {
      id: 'business_requirements',
      name: '业务需求分析',
      description: '明确产品愿景、业务目标和用户需求',
      subtasks: [
        '明确产品愿景和业务目标',
        '识别关键业务价值和成功指标',
        '收集用户故事和场景',
        '定义用户角色和流程'
      ]
    },
    {
      id: 'domain_model',
      name: '领域模型设计',
      description: '构建业务领域的概念模型',
      subtasks: [
        '识别核心业务实体和概念',
        '定义实体之间的关系',
        '创建领域术语表',
        '绘制领域模型图'
      ]
    },
    {
      id: 'business_value_assessment',
      name: '业务价值评估',
      description: '评估需求的业务价值和优先级',
      subtasks: [
        '对需求进行业务价值评分',
        '评估实现复杂度和风险',
        '使用优先级矩阵进行排序',
        '确定MVP(最小可行产品)范围'
      ]
    },
    {
      id: 'iteration_planning',
      name: '迭代计划制定',
      description: '规划开发迭代和发布计划',
      subtasks: [
        '将需求组织到迭代中',
        '定义迭代目标和验收标准',
        '制定产品路线图',
        '设定里程碑和关键日期'
      ]
    },
    {
      id: 'environment_setup',
      name: '环境准备',
      description: '规划和准备开发环境',
      subtasks: [
        '定义技术栈和工具链',
        '设置版本控制和CI/CD流程',
        '准备开发、测试和生产环境',
        '建立部署和监控策略'
      ]
    }
  ],
  
  /**
   * 思维工具模板
   */
  thinkingToolTemplates: {
    // 业务目标相关模板
    productVisionCanvas: {
      title: '产品愿景画布',
      template: `
# 产品愿景画布

## 目标用户
[描述目标用户群体]

## 用户痛点
- [痛点1]
- [痛点2]
- ...

## 解决方案
[产品/服务如何解决用户痛点]

## 独特价值主张
[产品与竞品相比的核心优势]

## 关键指标
- [指标1]
- [指标2]
- ...

## 市场机会
[市场规模、增长潜力、竞争格局]

## 业务模式
[如何创造和获取价值]

## 高阶目标
[产品长期愿景和使命]
      `
    },
    
    smartGoals: {
      title: 'SMART目标设定',
      template: `
# SMART目标设定

## 目标描述
[概述目标内容]

## SMART分析
- **具体(Specific)**: [目标是否足够具体和明确]
- **可测量(Measurable)**: [如何衡量目标的完成度]
- **可实现(Achievable)**: [目标是否现实可行]
- **相关性(Relevant)**: [目标与业务战略的关联度]
- **时限性(Time-bound)**: [目标的完成时间]

## 行动计划
1. [行动步骤1]
2. [行动步骤2]
3. ...

## 资源需求
[实现目标所需的资源]

## 责任人
[负责目标实现的人员]

## 风险评估
[可能的风险及应对策略]
      `
    },
    
    // 用户故事相关模板
    userPersona: {
      title: '用户角色卡',
      template: `
# 用户角色卡

## 基本信息
- **角色名称**: [例: 销售经理]
- **年龄范围**: [例: 30-45岁]
- **职位/角色**: [例: 销售团队管理者]

## 背景
[用户的背景信息、工作环境等]

## 目标和动机
- [主要目标1]
- [主要目标2]
- ...

## 痛点和挑战
- [痛点1]
- [痛点2]
- ...

## 技术熟练度
[对技术的接受程度和使用能力]

## 使用场景
[在什么情景下会使用产品]

## 期望和需求
[对产品的主要期望和需求]

## 引用语录
"[能够代表这类用户思维的引用语]"
      `
    },
    
    userStoryTemplate: {
      title: '用户故事模板',
      template: `
# 用户故事集

## 用户故事模板
作为一个[角色]，我想要[功能/行为]，以便[获得的价值/好处]

## 用户故事列表

### 故事1
- **角色**: [用户角色]
- **需求**: [用户想要的功能]
- **价值**: [功能带来的价值]
- **验收标准**:
  1. [标准1]
  2. [标准2]
  3. ...
- **估算**: [工作量估算，如故事点]
- **优先级**: [优先级]
- **备注**: [附加信息]

### 故事2
...

## INVEST原则检查清单
确保每个用户故事符合INVEST原则:
- **独立(Independent)**: 故事之间尽可能少的依赖
- **可协商(Negotiable)**: 细节可以在实现前协商
- **有价值(Valuable)**: 对用户或客户有实际价值
- **可估算(Estimable)**: 能够估算工作量
- **短小(Small)**: 足够小，可在一个迭代内完成
- **可测试(Testable)**: 有明确的验收标准
      `
    },
    
    // 领域模型相关模板
    glossary: {
      title: '术语表',
      template: `
# 业务领域术语表

## 使用指南
本术语表定义了项目中使用的关键业务术语，确保团队成员对业务概念有一致的理解。

## 术语定义

### [术语1]
- **定义**: [术语的明确定义]
- **示例**: [使用示例]
- **上下文**: [在系统中的使用场景]
- **关联术语**: [相关联的其他术语]

### [术语2]
...

## 分类索引
- **核心业务对象**: [相关术语列表]
- **流程相关术语**: [相关术语列表]
- **角色相关术语**: [相关术语列表]
- **系统特定术语**: [相关术语列表]
      `
    },
    
    entityRelationshipMapping: {
      title: '实体关系映射',
      template: `
# 领域实体关系模型

## 核心实体

### [实体1]
- **描述**: [实体的业务含义]
- **属性**:
  - [属性1]: [描述]
  - [属性2]: [描述]
  - ...
- **关系**:
  - 与[实体A]关系: [关系类型，如一对多、多对多]
  - 与[实体B]关系: [关系类型]
  - ...

### [实体2]
...

## 实体关系图
\`\`\`
[这里可以用ASCII或Markdown绘制简单的ER图，
或者提供指向专业绘图工具的链接]
\`\`\`

## 业务规则
1. [与实体关系相关的业务规则1]
2. [业务规则2]
3. ...

## 领域事件
1. [重要领域事件1]
2. [领域事件2]
3. ...
      `
    },
    
    // 优先级排序相关模板
    valueComplexityMatrix: {
      title: '价值-复杂度矩阵',
      template: `
# 价值-复杂度优先级矩阵

## 评估标准

### 业务价值评估 (1-5分)
- 1分: 极低价值，可有可无
- 2分: 低价值，有一定好处
- 3分: 中等价值，明显改善用户体验
- 4分: 高价值，解决关键痛点
- 5分: 极高价值，核心功能，必不可少

### 实现复杂度评估 (1-5分)
- 1分: 非常简单，几小时内可完成
- 2分: 较简单，1-2天可完成
- 3分: 中等复杂，3-5天可完成
- 4分: 较复杂，1-2周可完成
- 5分: 非常复杂，需要多周和多人协作

## 优先级矩阵

| 需求ID | 需求描述 | 业务价值 | 实现复杂度 | 优先级象限 | 排序 |
|--------|----------|----------|------------|------------|------|
| REQ01  | [描述]   | [1-5]    | [1-5]      | [象限]     | [#]  |
| REQ02  | [描述]   | [1-5]    | [1-5]      | [象限]     | [#]  |
| ...    | ...      | ...      | ...        | ...        | ...  |

## 象限说明
- **象限一(高价值/低复杂度)**: 立即实施，最高优先级
- **象限二(高价值/高复杂度)**: 需要计划的重点项目
- **象限三(低价值/低复杂度)**: 如果有资源可以实施
- **象限四(低价值/高复杂度)**: 避免或推迟实施
      `
    },
    
    moscowPrioritization: {
      title: 'MoSCoW优先级排序',
      template: `
# MoSCoW优先级排序

## 分类标准
- **必须有(Must Have)**: 核心功能，没有则产品无法发布
- **应该有(Should Have)**: 重要功能，但不是首次发布的必要条件
- **可以有(Could Have)**: 有价值但非必要功能，有资源才实现
- **暂不需要(Won't Have)**: 现阶段不实现，但可能在未来版本中考虑

## 需求优先级列表

### 必须有(Must Have)
1. [需求1]: [简短描述]
2. [需求2]: [简短描述]
3. ...

### 应该有(Should Have)
1. [需求1]: [简短描述]
2. [需求2]: [简短描述]
3. ...

### 可以有(Could Have)
1. [需求1]: [简短描述]
2. [需求2]: [简短描述]
3. ...

### 暂不需要(Won't Have)
1. [需求1]: [简短描述]
2. [需求2]: [简短描述]
3. ...

## 评估依据
[说明优先级评估的主要考虑因素]

## MVP范围
[明确定义最小可行产品包含的"必须有"需求]
      `
    },
    
    // 迭代计划相关模板
    iterationPlanningTemplate: {
      title: '迭代计划模板',
      template: `
# 迭代计划

## 项目信息
- **项目名称**: [项目名]
- **迭代周期**: [x周]
- **计划迭代数**: [数量]
- **团队规模**: [人数]

## 迭代概览

| 迭代编号 | 时间范围 | 主要目标 | 关键交付物 |
|----------|----------|----------|------------|
| 迭代1    | [日期]   | [目标]   | [交付物]   |
| 迭代2    | [日期]   | [目标]   | [交付物]   |
| ...      | ...      | ...      | ...        |

## 详细迭代计划

### 迭代1
- **目标**: [迭代目标]
- **时间范围**: [开始日期] 至 [结束日期]
- **用户故事**:
  - [ ] [用户故事1]
  - [ ] [用户故事2]
  - [ ] ...
- **验收标准**:
  - [标准1]
  - [标准2]
  - ...
- **风险和依赖**:
  - [风险1]: [缓解策略]
  - [依赖1]: [处理方法]

### 迭代2
...

## 容量规划
[团队容量分析和工作量估算]

## 调整机制
[迭代计划调整的触发条件和流程]
      `
    },
    
    roadmapTemplate: {
      title: '产品路线图模板',
      template: `
# 产品路线图

## 产品愿景
[概述产品的长期愿景和目标]

## 路线图概览

| 阶段 | 时间范围 | 核心主题 | 主要功能 | 里程碑 |
|------|----------|----------|----------|--------|
| MVP  | [日期]   | [主题]   | [功能]   | [里程碑] |
| 第二阶段 | [日期] | [主题]   | [功能]   | [里程碑] |
| ...  | ...      | ...      | ...      | ...    |

## 详细规划

### MVP阶段
- **核心价值**: [核心价值主张]
- **主要功能**:
  - [功能模块1]
  - [功能模块2]
  - ...
- **发布目标**: [日期和目标市场]
- **成功指标**: [如何衡量成功]

### 第二阶段
...

## 战略主题
[长期产品发展的关键主题和方向]

## 市场和用户考量
[目标市场演变和用户需求变化的预期]

## 技术路线
[支持产品路线图的技术演进计划]
      `
    }
  },
  
  /**
   * 对话引导问题
   */
  dialogueQuestions: {
    businessObjectives: [
      '这个项目要解决什么核心业务问题？',
      '您希望通过这个项目实现哪些具体的业务目标？',
      '如何衡量项目的成功？有哪些关键的成功指标？',
      '项目的主要利益相关者是谁？他们各自的期望是什么？',
      '产品的核心价值主张是什么？它如何区别于现有的解决方案？',
      '实现这些目标有什么约束条件或限制因素？',
      '您对项目有什么特定的时间或预算限制吗？',
      '从业务角度来看，哪些功能对于首次发布至关重要？'
    ],
    
    userStories: [
      '系统的主要用户群体有哪些？他们有什么特点？',
      '这些用户希望使用系统实现什么目标？',
      '用户在使用现有系统或流程时遇到哪些痛点？',
      '用户会在什么场景或环境下使用这个系统？',
      '用户与系统交互的典型流程是什么？',
      '系统需要支持哪些关键的用户行为？',
      '用户对系统的使用频率预期是怎样的？',
      '系统的可用性和易用性对于用户有多重要？'
    ],
    
    domainModel: [
      '这个业务领域中有哪些核心概念和实体？',
      '这些实体之间存在什么关系？',
      '业务中有哪些关键的业务规则和约束？',
      '领域中有哪些特定的术语和定义需要明确？',
      '什么是系统需要处理的主要业务事件和流程？',
      '有哪些数据需要被系统捕获和处理？',
      '在业务运作中，哪些是不变的核心规则，哪些可能随时间变化？',
      '业务领域中有哪些特殊的边界条件或异常情况？'
    ],
    
    prioritization: [
      '从业务角度，哪些需求对业务成功最关键？',
      '如何评估每个需求的业务价值？',
      '实现每个需求的技术复杂度如何？',
      '哪些需求存在依赖关系？',
      '如何定义最小可行产品(MVP)的范围？',
      '哪些需求可以推迟到后续版本？',
      '有没有任何法规或合规要求必须优先考虑？',
      '用户会如何看待不同需求的重要性？'
    ],
    
    iterationPlanning: [
      '考虑到团队规模和能力，什么是合理的迭代周期？',
      '如何将已优先级排序的需求组织成迭代？',
      '每个迭代的目标和交付物是什么？',
      '团队的估算能力和工作容量如何？',
      '如何平衡新功能开发和技术债务管理？',
      '开发过程中需要哪些检查点和里程碑？',
      '有哪些已知的风险和依赖关系需要在计划中考虑？',
      '产品的长期路线图是什么样的？'
    ],
    
    environmentSetup: [
      '项目需要哪些开发、测试和生产环境？',
      '开发过程中会使用哪些主要的技术栈和工具？',
      '如何管理代码版本控制和分支策略？',
      '需要建立什么样的CI/CD流程？',
      '如何处理环境间的配置管理？',
      '有哪些特殊的安全或性能要求需要在环境设置中考虑？',
      '如何监控应用性能和用户体验？',
      '部署和发布的策略是什么？'
    ]
  },
  
  /**
   * 标准化输出文档
   */
  outputDocuments: {
    businessObjectives: {
      name: '业务目标文档',
      template: 'business_objectives_template.md',
      path: './docs/requirements/business',
      description: '定义项目的业务目标、价值主张和成功指标'
    },
    userStories: {
      name: '用户故事文档',
      template: 'user_stories_template.md',
      path: './docs/requirements/user',
      description: '收集和组织用户故事及验收标准'
    },
    domainModel: {
      name: '领域模型文档',
      template: 'domain_model_template.md',
      path: './docs/requirements/domain',
      description: '定义业务领域的核心概念和关系'
    },
    glossary: {
      name: '术语表',
      template: 'glossary_template.md',
      path: './docs/requirements/domain',
      description: '业务术语的标准定义'
    },
    prioritization: {
      name: '需求优先级文档',
      template: 'prioritization_template.md',
      path: './docs/requirements/prioritization',
      description: '需求的优先级排序和理由'
    },
    iterationPlanning: {
      name: '迭代计划文档',
      template: 'iteration_plan_template.md',
      path: './docs/requirements/planning',
      description: '迭代计划和发布策略'
    },
    roadmap: {
      name: '产品路线图',
      template: 'roadmap_template.md',
      path: './docs/requirements/planning',
      description: '产品的长期发展计划'
    },
    environmentSetup: {
      name: '环境设置文档',
      template: 'environment_setup_template.md',
      path: './docs/requirements/environment',
      description: '开发和部署环境的设置指南'
    }
  }
};

/**
 * 会话进程模型
 * 指导对话的进展和状态管理
 */
const SessionProgressModel = {
  /**
   * 会话状态
   */
  states: {
    INITIAL: 'initial',
    QUESTIONS: 'asking_questions',
    ANALYSIS: 'analysis',
    DOCUMENTATION: 'documentation',
    REVIEW: 'review',
    COMPLETE: 'complete'
  },
  
  /**
   * 会话阶段进展逻辑
   */
  transitions: {
    initial: {
      next: 'asking_questions',
      conditions: ['introductionComplete']
    },
    asking_questions: {
      next: 'analysis',
      conditions: ['sufficientInformation']
    },
    analysis: {
      next: 'documentation',
      conditions: ['analysisComplete']
    },
    documentation: {
      next: 'review',
      conditions: ['documentationDrafted']
    },
    review: {
      next: 'complete',
      conditions: ['reviewComplete']
    }
  },
  
  /**
   * 引导话题的推进方法
   */
  progressTopics: {
    businessObjectives: [
      '业务目标和价值主张',
      '成功指标和期望',
      '约束条件和限制',
      '市场定位和差异化'
    ],
    userStories: [
      '用户角色识别',
      '用户目标和需求',
      '用户场景和流程',
      '用户痛点和期望'
    ],
    domainModel: [
      '核心业务实体',
      '实体关系和规则',
      '业务术语和定义',
      '业务流程和事件'
    ],
    prioritization: [
      '业务价值评估',
      '技术复杂度分析',
      'MVP范围定义',
      '优先级矩阵构建'
    ],
    iterationPlanning: [
      '迭代周期和容量',
      '需求分组和排序',
      '里程碑和检查点',
      '风险和依赖管理'
    ],
    environmentSetup: [
      '环境架构设计',
      '工具链和流程',
      '部署和发布策略',
      '监控和维护计划'
    ]
  },
  
  /**
   * 引导性问题的深度层次
   */
  questionDepthLevels: {
    INITIAL: '初始高层问题',
    FOLLOW_UP: '跟进和澄清问题',
    DETAILED: '细节和具体场景问题',
    EDGE_CASES: '边缘情况和异常问题',
    VALIDATION: '验证和确认问题'
  },
  
  /**
   * 会话节奏控制器
   */
  rhythmController: {
    questionBatchSize: 2,
    analysisBeforeNextQuestions: true,
    summarizeProgress: true,
    timingPauses: {
      afterQuestionBatch: true,
      beforeDocumentation: true
    }
  }
};

// 导出模块
module.exports = {
  RequirementAnalysisPhase,
  SessionProgressModel
}; 