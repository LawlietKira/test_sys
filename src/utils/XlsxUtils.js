var xlsx2json = require("node-xlsx");
var fs = require("fs");
var path = require('path')

var XlsxUtils = function(){
}

XlsxUtils.parse = function(filename){
	var list = xlsx2json.parse(filename);
	var data = []
	list[0].data.forEach(function(item, index){
		if(index > 0 && item[0] && item[0].trim().length > 0){
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
	console.log(`读取${filename}文件成功`);
	return data;
}

XlsxUtils.write = function(data){
	fs.writeFile(path.resolve(__dirname, '../../assets/json/tests.json'),JSON.stringify(data),
			{flag:'w',encoding:'utf-8'},function(err){
	     if(err){
	         console.log(`文件写入失败`)
	     }else{
	         console.log(`文件写入成功`);
	     }
	}) 
}

module.exports = XlsxUtils;
