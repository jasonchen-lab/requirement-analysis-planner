/**
 * 需求分析与规划MCP工具安装脚本
 * 
 * 该脚本用于将需求分析与规划MCP工具安装到Cursor AI的MCP工具目录中。
 * 执行该脚本会自动复制必要的文件并进行环境配置。
 * 
 * @author 敏捷超级个体实践团队
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置信息
const config = {
  // 要复制的文件
  files: [
    'requirement_analysis_planner.js',
    'requirement_analysis_planner_demo.js',
    'requirement_analysis_planner_README.md'
  ],
  
  // MCP工具目录的默认位置
  defaultMcpToolsDir: path.join(process.env.APPDATA || process.env.HOME || process.env.USERPROFILE, 'CursorAI', 'mcp_tools'),
  
  // 安装目录名称
  installDirName: 'requirement_analysis_planner'
};

/**
 * 主安装函数
 */
async function install() {
  console.log('===== 需求分析与规划MCP工具安装程序 =====\n');
  
  try {
    // 1. 检查源文件是否存在
    console.log('正在检查源文件...');
    const currentDir = process.cwd();
    
    for (const file of config.files) {
      const filePath = path.join(currentDir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`源文件 ${file} 不存在，请确保您在正确的目录中运行此脚本。`);
      }
    }
    console.log('✓ 所有源文件检查通过\n');
    
    // 2. 确定目标目录
    console.log('正在确定MCP工具安装目录...');
    let mcpToolsDir = config.defaultMcpToolsDir;
    
    // 让用户确认或修改目标目录
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const getUserInput = (question) => {
      return new Promise((resolve) => {
        readline.question(question, (answer) => {
          resolve(answer);
        });
      });
    };
    
    console.log(`默认MCP工具目录: ${mcpToolsDir}`);
    const userDir = await getUserInput('请确认或输入新的MCP工具目录 (直接回车使用默认目录): ');
    
    if (userDir.trim()) {
      mcpToolsDir = userDir.trim();
    }
    
    // 3. 创建安装目录
    const installDir = path.join(mcpToolsDir, config.installDirName);
    console.log(`\n将安装到目录: ${installDir}`);
    
    if (!fs.existsSync(mcpToolsDir)) {
      console.log('MCP工具主目录不存在，正在创建...');
      fs.mkdirSync(mcpToolsDir, { recursive: true });
    }
    
    if (!fs.existsSync(installDir)) {
      console.log('安装目录不存在，正在创建...');
      fs.mkdirSync(installDir, { recursive: true });
    } else {
      console.log('安装目录已存在，将更新文件...');
    }
    
    // 4. 复制文件
    console.log('\n正在复制文件...');
    for (const file of config.files) {
      const sourcePath = path.join(currentDir, file);
      const targetPath = path.join(installDir, file);
      
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ 已复制: ${file}`);
    }
    
    // 5. 创建示例文档目录
    const docsDir = path.join(installDir, 'docs', 'requirements');
    const docFolders = [
      'business',
      'user',
      'domain',
      'prioritization',
      'planning',
      'environment'
    ];
    
    console.log('\n正在创建示例文档目录...');
    fs.mkdirSync(path.join(installDir, 'docs'), { recursive: true });
    fs.mkdirSync(docsDir, { recursive: true });
    
    for (const folder of docFolders) {
      const folderPath = path.join(docsDir, folder);
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✓ 已创建: docs/requirements/${folder}`);
    }
    
    // 6. 配置权限设置
    console.log('\n正在设置文件权限...');
    try {
      if (process.platform !== 'win32') {
        // Unix类系统设置执行权限
        execSync(`chmod +x ${path.join(installDir, 'requirement_analysis_planner_demo.js')}`);
        console.log('✓ 已设置执行权限');
      }
    } catch (error) {
      console.log('⚠️ 设置执行权限失败，但这不影响工具使用');
    }
    
    // 7. 完成安装
    console.log('\n===== 安装完成 =====');
    console.log(`\n需求分析与规划MCP工具已成功安装到:\n${installDir}`);
    console.log('\n使用方法:');
    console.log('1. 在Cursor AI中启动新会话');
    console.log('2. 使用以下方式引用工具:');
    console.log('   "请使用需求分析与规划MCP工具帮助我收集并分析项目需求"');
    console.log('\n详细说明请参考:');
    console.log(`${path.join(installDir, 'requirement_analysis_planner_README.md')}`);
    
    readline.close();
  } catch (error) {
    console.error('\n❌ 安装失败:', error.message);
    process.exit(1);
  }
}

// 执行安装
install(); 