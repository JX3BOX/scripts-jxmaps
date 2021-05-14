const fs = require('fs')
const iconv = require('iconv-lite')

function liekai() {
  // 先统一将文件用二进制编码方式读取，然后用 gbk 解码
  fs.readFile("./MapList.tab", "binary", function(err, data){
    const _data = iconv.decode(data, 'gbk')
    var rows = _data.split("\n");
    var json = [];
    var keys = [];

    rows.forEach((value, index)=>{
        if(index < 1){// get the keys from the first row in the tab space file
            keys = value.split("\t");
        }else {// put the values from the following rows into object literals
            values = value.split("\t");
            json[index-1] = values.map((value, index) => {
                return {
                    [keys[index]]: value
                }
            }).reduce((currentValue, previousValue) => {
                return {
                    ...currentValue,
                    ...previousValue
                }
            });
        }
    })


    // convert array of objects into json str, and then write it back out to a file

    const _json = json.map(js => {
      return {
        ID: js.ID,
        Name: js.Name,
        DisplayName: js.DisplayName,
        Perform: js.Perform,
        ResourcePath: js.ResourcePath
      }
    })

    let jsonStr = JSON.stringify(_json);
    // let jsonStr = JSON.stringify(json);
    fs.writeFileSync("map.json", jsonStr, {encoding: "utf8"})
  });
}

liekai()