var xlsx2json = require("node-xlsx");
var fs = require("fs");
var path = require('path')

var list = xlsx2json.parse(path.resolve(__dirname,'../../assets/xmls/题库录入.xlsx'));

var data = []
list[0].data.forEach(function(item, index){
	if(index > 0){
		var temp = {
			question: item[0],
			answers:item.slice(2),
			answer: item[1] || ''
		}
		if(temp.answer.length === 1){
			temp.type = 'S'
		}else{
			temp.type = 'M'
		}
		data.push(temp)
	}
});
console.log('读取文件成功');
fs.writeFile(path.resolve(__dirname, '../../assets/json/tests.json'),JSON.stringify(data),
		{flag:'w',encoding:'utf-8'},function(err){
     if(err){
         console.log("文件写入失败")
     }else{
         console.log("文件写入成功");
     }
}) 

