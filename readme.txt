.env 文件内参数

MAP= # 地图文件所在路径
SOURCE= # data\source\maps 所在路径
TARGET= # 生成文件所在位置
IMAGE_TARGET= # 导出图片所在位置

1. 在本项目根目录（有 package.json）运行 npm install
2. 运行 npm install -g，运行 jx3maps 不报错即为安装成功
3. 运行 jx3maps run 1，根据 MAP 目录下的 MapList.tab，在 TARGET 目录生成 map.json
4. 运行 jx3maps run 2，根据 map.json 文件读取 SOURCE 目录， 在 TARGET 目录生成 config.txt，文件内容为 configini 的路径
5. 运行 jx3maps run 3，会根据 config.ini 生成 image.tab 和 image.json 文件，image.tab 文件内容是每个地图的路径和基本信息，image.json 用于下一步的比对
6. 运行 jx3maps run 4，根据 image.tab 文件纠正 image.json 中图片格式错误，重新生成 image.tab 和 image.json 文件
7. 运行 jx3maps run 5，根据 image.json 进行图片转换和命名，并在 IMAGE_TARGET 生成 images 目录保存转换后的图片，如果有文件找不到，会生成一个 缺图.txt

工具函数

jx3maps run 0 查询哪个图片并未输出