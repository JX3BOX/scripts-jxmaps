## 函数功能
1. `maplist2json.js`: 根据map表找到地图id和地图模型路径 `MapList.tab` 转换成 `.json` 文件
2. `mie2minimap.js`: 猜测图片文件夹并输出路径 将带有 `.jsonmap` 文件的父文件夹改名为 `xxxminimap`
3. `config2img.js`: 输出图片路径 遍历 `config.ini` 生成 `image.txt` 存放图片路径
4. `checkexist.js`: 图片补充猜测路径 转换对应的图片格式
5. `renderimg.js`: 图片转换与命名 

## 使用说明

```
1. 在本项目根目录（有 package.json）运行 npm install
2. 运行 npm install -g，运行 jx3maps 不报错即为安装成功
3. 在目标目录（data 目录）运行 jx3maps run 1，在当前目录生成 map.json
4. 运行 jx3maps run 2，生成 config.txt，此文件用于解包对应的文件
5. 运行 jx3maps run 3，会根据 “地图minimap” 文件夹内的 config.ini 生成 image.txt 文件，保存该地图的图片地址
6. 运行 jx3maps run 4，纠正 image.txt 中图片格式错误
7. 运行 jx3maps run 5，根据 map.json 和 image.txt 进行图片转换和命名，并在当前目录（data 目录）生成 images 目录保存转换后的图片
```