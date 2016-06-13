# 设置基础镜像
FROM daocloud.io/node:5  

MAINTAINER kui_002@126.com

ENV HTTP_PORT 8000

COPY . /app  
WORKDIR /app

RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

# 暴露 8000 端口，便于访问
EXPOSE 8000

# 设置启动时默认运行命令
CMD ["npm start"]  