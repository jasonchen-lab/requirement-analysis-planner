/**
 * 需求分析与规划阶段MCP工具使用示例
 * 
 * 本示例展示如何将需求分析与规划MCP工具集成到Cursor环境中，
 * 并提供各阶段任务的具体使用方法。
 * 
 * @author 敏捷超级个体实践团队
 * @version 1.0.0
 */

// 引入核心模型
const { RequirementAnalysisPhase, SessionProgressModel } = require('./requirement_analysis_planner');

// MCP注册函数
function registerMCPTools(mcpContext) {
  // 注册工具集
  mcpContext.register({
    name: 'requirement_analysis_planner',
    description: '需求分析与规划阶段的结构化工作流程和思维工具',
    version: '1.0.0',
    tools: [
      // 主工具
      {
        name: 'initialize',
        description: '初始化需求分析与规划流程',
        parameters: {
          projectName: {
            type: 'string',
            description: '项目名称'
          },
          businessDomain: {
            type: 'string',
            description: '业务领域'
          }
        },
        handler: initializeRequirementAnalysis
      },
      
      // 业务目标工具
      {
        name: 'businessObjectives',
        description: '业务目标获取与分析',
        parameters: {},
        handler: handleBusinessObjectives
      },
      
      // 用户故事工具
      {
        name: 'userStories',
        description: '用户故事收集与编写',
        parameters: {},
        handler: handleUserStories
      },
      
      // 领域模型工具
      {
        name: 'domainModel',
        description: '领域模型构建',
        parameters: {},
        handler: handleDomainModel
      },
      
      // 优先级排序工具
      {
        name: 'prioritization',
        description: '需求优先级排序',
        parameters: {},
        handler: handlePrioritization
      },
      
      // 迭代计划工具
      {
        name: 'iterationPlanning',
        description: '迭代计划制定',
        parameters: {},
        handler: handleIterationPlanning
      },
      
      // 环境准备工具
      {
        name: 'environmentSetup',
        description: '开发环境准备',
        parameters: {},
        handler: handleEnvironmentSetup
      },
      
      // 获取思维工具模板
      {
        name: 'getToolTemplate',
        description: '获取特定思维工具模板',
        parameters: {
          toolName: {
            type: 'string',
            description: '工具名称',
            enum: Object.keys(RequirementAnalysisPhase.thinkingToolTemplates)
          }
        },
        handler: getToolTemplate
      }
    ]
  });
}

// 工具处理函数实现

/**
 * 初始化需求分析与规划流程
 */
async function initializeRequirementAnalysis(params, context) {
  const { projectName, businessDomain } = params;
  
  // 创建项目上下文
  const projectContext = {
    name: projectName,
    domain: businessDomain,
    startTime: new Date().toISOString(),
    phase: 'requirement_analysis',
    progress: {
      currentStep: 'start',
      completedTasks: [],
      pendingTasks: RequirementAnalysisPhase.tasks.map(task => task.id)
    }
  };
  
  // 保存项目上下文
  await context.storage.set('projectContext', projectContext);
  
  // 创建基础目录结构
  for (const docType in RequirementAnalysisPhase.outputDocuments) {
    const pathInfo = RequirementAnalysisPhase.outputDocuments[docType];
    await context.fileSystem.createDirectory(pathInfo.path);
  }
  
  // 返回初始化信息
  return {
    success: true,
    message: `需求分析与规划阶段已初始化 - 项目: ${projectName}, 领域: ${businessDomain}`,
    workflow: RequirementAnalysisPhase.workflow.steps,
    nextTask: 'businessObjectives'
  };
}

/**
 * 处理业务目标获取与分析任务
 */
async function handleBusinessObjectives(params, context) {
  // 获取项目上下文
  const projectContext = await context.storage.get('projectContext');
  
  // 更新当前进度
  projectContext.progress.currentStep = 'businessObjectives';
  await context.storage.set('projectContext', projectContext);
  
  // 返回对话引导和思维工具
  return {
    success: true,
    task: RequirementAnalysisPhase.tasks.find(t => t.id === 'business_requirements'),
    questions: RequirementAnalysisPhase.dialogueQuestions.businessObjectives,
    templates: {
      productVisionCanvas: RequirementAnalysisPhase.thinkingToolTemplates.productVisionCanvas,
      smartGoals: RequirementAnalysisPhase.thinkingToolTemplates.smartGoals
    },
    sessionModel: SessionProgressModel,
    outputPath: RequirementAnalysisPhase.outputDocuments.businessObjectives,
    nextTask: 'userStories'
  };
}

/**
 * 处理用户故事收集与编写任务
 */
async function handleUserStories(params, context) {
  // 获取项目上下文
  const projectContext = await context.storage.get('projectContext');
  
  // 更新当前进度
  projectContext.progress.currentStep = 'userStories';
  await context.storage.set('projectContext', projectContext);
  
  // 返回对话引导和思维工具
  return {
    success: true,
    task: RequirementAnalysisPhase.tasks.find(t => t.id === 'business_requirements'),
    questions: RequirementAnalysisPhase.dialogueQuestions.userStories,
    templates: {
      userPersona: RequirementAnalysisPhase.thinkingToolTemplates.userPersona,
      userStoryTemplate: RequirementAnalysisPhase.thinkingToolTemplates.userStoryTemplate
    },
    sessionModel: SessionProgressModel,
    outputPath: RequirementAnalysisPhase.outputDocuments.userStories,
    nextTask: 'domainModel'
  };
}

/**
 * 处理领域模型构建任务
 */
async function handleDomainModel(params, context) {
  // 获取项目上下文
  const projectContext = await context.storage.get('projectContext');
  
  // 更新当前进度
  projectContext.progress.currentStep = 'domainModel';
  await context.storage.set('projectContext', projectContext);
  
  // 返回对话引导和思维工具
  return {
    success: true,
    task: RequirementAnalysisPhase.tasks.find(t => t.id === 'domain_model'),
    questions: RequirementAnalysisPhase.dialogueQuestions.domainModel,
    templates: {
      glossary: RequirementAnalysisPhase.thinkingToolTemplates.glossary,
      entityRelationshipMapping: RequirementAnalysisPhase.thinkingToolTemplates.entityRelationshipMapping
    },
    sessionModel: SessionProgressModel,
    outputPath: RequirementAnalysisPhase.outputDocuments.domainModel,
    nextTask: 'prioritization'
  };
}

/**
 * 处理需求优先级排序任务
 */
async function handlePrioritization(params, context) {
  // 获取项目上下文
  const projectContext = await context.storage.get('projectContext');
  
  // 更新当前进度
  projectContext.progress.currentStep = 'prioritization';
  await context.storage.set('projectContext', projectContext);
  
  // 返回对话引导和思维工具
  return {
    success: true,
    task: RequirementAnalysisPhase.tasks.find(t => t.id === 'business_value_assessment'),
    questions: RequirementAnalysisPhase.dialogueQuestions.prioritization,
    templates: {
      valueComplexityMatrix: RequirementAnalysisPhase.thinkingToolTemplates.valueComplexityMatrix,
      moscowPrioritization: RequirementAnalysisPhase.thinkingToolTemplates.moscowPrioritization
    },
    sessionModel: SessionProgressModel,
    outputPath: RequirementAnalysisPhase.outputDocuments.prioritization,
    nextTask: 'iterationPlanning'
  };
}

/**
 * 处理迭代计划制定任务
 */
async function handleIterationPlanning(params, context) {
  // 获取项目上下文
  const projectContext = await context.storage.get('projectContext');
  
  // 更新当前进度
  projectContext.progress.currentStep = 'iterationPlanning';
  await context.storage.set('projectContext', projectContext);
  
  // 返回对话引导和思维工具
  return {
    success: true,
    task: RequirementAnalysisPhase.tasks.find(t => t.id === 'iteration_planning'),
    questions: RequirementAnalysisPhase.dialogueQuestions.iterationPlanning,
    templates: {
      iterationPlanningTemplate: RequirementAnalysisPhase.thinkingToolTemplates.iterationPlanningTemplate,
      roadmapTemplate: RequirementAnalysisPhase.thinkingToolTemplates.roadmapTemplate
    },
    sessionModel: SessionProgressModel,
    outputPath: RequirementAnalysisPhase.outputDocuments.iterationPlanning,
    nextTask: 'environmentSetup'
  };
}

/**
 * 处理开发环境准备任务
 */
async function handleEnvironmentSetup(params, context) {
  // 获取项目上下文
  const projectContext = await context.storage.get('projectContext');
  
  // 更新当前进度
  projectContext.progress.currentStep = 'environmentSetup';
  await context.storage.set('projectContext', projectContext);
  
  // 返回对话引导和环境配置指南
  return {
    success: true,
    task: RequirementAnalysisPhase.tasks.find(t => t.id === 'environment_setup'),
    environmentTypes: [
      '开发环境',
      '测试环境',
      '预生产环境',
      '生产环境'
    ],
    toolChainOptions: [
      '版本控制工具 (Git)',
      '持续集成/持续部署 (CI/CD)',
      '容器化技术 (Docker)',
      '自动化测试框架',
      '日志和监控系统'
    ],
    sessionModel: SessionProgressModel,
    outputPath: RequirementAnalysisPhase.outputDocuments.environmentSetup,
    nextTask: 'reviewAndFinalize'
  };
}

/**
 * 获取特定思维工具模板
 */
function getToolTemplate(params, context) {
  const { toolName } = params;
  
  // 检查模板是否存在
  if (!RequirementAnalysisPhase.thinkingToolTemplates[toolName]) {
    return {
      success: false,
      message: `模板 "${toolName}" 不存在`
    };
  }
  
  // 返回请求的模板
  return {
    success: true,
    toolName: toolName,
    template: RequirementAnalysisPhase.thinkingToolTemplates[toolName]
  };
}

// 示例：如何使用MCP工具进行需求分析
async function requirementAnalysisExample() {
  console.log('===== 需求分析与规划阶段MCP工具使用示例 =====');
  
  // 模拟MCP上下文
  const mockContext = {
    storage: {
      data: {},
      async get(key) { return this.data[key]; },
      async set(key, value) { this.data[key] = value; }
    },
    fileSystem: {
      async createDirectory(path) {
        console.log(`创建目录: ${path}`);
      }
    }
  };
  
  // 初始化需求分析
  console.log('\n1. 初始化需求分析阶段');
  const initResult = await initializeRequirementAnalysis({
    projectName: '客户关系管理系统',
    businessDomain: '销售管理'
  }, mockContext);
  console.log(initResult);
  
  // 进行业务目标获取
  console.log('\n2. 业务目标获取与分析');
  const objectivesResult = await handleBusinessObjectives({}, mockContext);
  console.log('核心问题:');
  objectivesResult.questions.forEach((q, i) => console.log(`  ${i+1}. ${q}`));
  console.log('思维工具:');
  console.log('- 产品愿景画布');
  console.log('- SMART目标模板');
  
  // 进行用户故事收集
  console.log('\n3. 用户故事收集与编写');
  const storiesResult = await handleUserStories({}, mockContext);
  console.log('核心问题:');
  storiesResult.questions.forEach((q, i) => console.log(`  ${i+1}. ${q}`));
  console.log('思维工具:');
  console.log('- 用户角色卡');
  console.log('- 用户故事模板');
  
  // 进行领域模型构建
  console.log('\n4. 领域模型构建');
  const domainResult = await handleDomainModel({}, mockContext);
  console.log('核心问题:');
  domainResult.questions.forEach((q, i) => console.log(`  ${i+1}. ${q}`));
  console.log('思维工具:');
  console.log('- 术语表');
  console.log('- 实体关系映射');
  
  // 进行优先级排序
  console.log('\n5. 需求优先级排序');
  const priorityResult = await handlePrioritization({}, mockContext);
  console.log('核心问题:');
  priorityResult.questions.forEach((q, i) => console.log(`  ${i+1}. ${q}`));
  console.log('思维工具:');
  console.log('- 价值-复杂度矩阵');
  console.log('- MOSCOW优先级');
  
  // 进行迭代计划
  console.log('\n6. 迭代计划制定');
  const planningResult = await handleIterationPlanning({}, mockContext);
  console.log('核心问题:');
  planningResult.questions.forEach((q, i) => console.log(`  ${i+1}. ${q}`));
  console.log('思维工具:');
  console.log('- 迭代计划模板');
  console.log('- 产品路线图');
  
  // 环境准备
  console.log('\n7. 开发环境准备');
  const envResult = await handleEnvironmentSetup({}, mockContext);
  console.log('环境类型:');
  envResult.environmentTypes.forEach(env => console.log(`  - ${env}`));
  console.log('工具链选项:');
  envResult.toolChainOptions.forEach(tool => console.log(`  - ${tool}`));
  
  console.log('\n===== 需求分析与规划阶段完成 =====');
}

// 导出MCP工具注册函数和示例
module.exports = {
  registerMCPTools,
  requirementAnalysisExample
};

// 如果直接运行此文件，执行示例
if (require.main === module) {
  requirementAnalysisExample();
} 