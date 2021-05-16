# JX3MAPS

用于生成 jx3 各地图 minimap 图片和 loading 图片
## 函数功能
1. `maplist2json.js`: 根据map表找到地图id和地图模型路径 `MapList.tab` 转换成 `.json` 文件
2. `mie2minimap.js`: 猜测图片文件夹并输出路径 将带有 `.jsonmap` 文件的父文件夹改名为 `xxxminimap`
3. `config2img.js`: 输出图片路径 遍历 `config.ini` 生成 `image.txt` 存放图片路径
4. `checkexist.js`: 图片补充猜测路径 转换对应的图片格式
5. `renderimg.js`: 图片转换与命名 

## 使用说明

`.env` 文件内参数

```
MAP= # 地图文件所在路径
SOURCE= # data\source\maps 所在路径
TARGET= # 生成文件所在位置
IMAGE_TARGET= # 导出图片所在位置
```

1. 在本项目根目录（有 package.json）运行 npm install
2. 运行 npm install -g，运行 jx3maps 不报错即为安装成功
3. 运行 jx3maps run 1，根据 MAP 目录下的 MapList.tab，在 TARGET 目录生成 map.json
4. 运行 jx3maps run 2，根据 map.json 文件读取 SOURCE 目录， 在 TARGET 目录生成 config.txt，文件内容为 configini 的路径
5. 运行 jx3maps run 3，会根据 config.ini 生成 image.tab 和 image.json 文件，image.tab 文件内容是每个地图的路径和基本信息，image.json 用于下一步的比对
6. 运行 jx3maps run 4，根据 image.tab 文件纠正 image.json 中图片格式错误，重新生成 image.tab 和 image.json 文件
7. 运行 jx3maps run 5，根据 image.json 进行图片转换和命名，并在 IMAGE_TARGET 生成 images 目录保存转换后的图片