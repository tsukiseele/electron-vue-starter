# Electron Starter Template
## 准备工作
> 　<br/>
> 仅安装未安装的模块，已安装请忽略  
> 　<br/>
```bash
# 安装Node.js（14.20.x或者以上版本），或者使用nvm安装
参见: https://nodejs.org/en/download/releases/
# 安装windows-build-tools
npm i -g windows-build-tools -verbose
# 切换墙内镜像
npm config set registry https://registry.npm.taobao.org/
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

## 初始化流程
```bash
# 安装依赖
npm i 
# 卸载64位版本
npm uni electron ffi-napi
# 安装32位版本
npm i -D electron@17.4.11 --arch=ia32
npm i -S ffi-napi@4.0.3 --arch=ia32
```

## 运行
```bash
# 启动热重载调试
npm run start
# 构建（完整流程）
npm run build
# 构建（仅输出源文件）
npm run pack
```

