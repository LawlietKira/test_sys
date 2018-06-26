var fs = require('fs'),
	path = require('path'),
	XlsxUtils = require('./XlsxUtils.js');
	
var filePath = path.resolve(__dirname, '../../assets/xlsx/');

var getFileList = function(filePath){
	var p = new Promise(function(resolve,reject){
		fs.readdir(filePath,function(err,files){
	        if(err){
	            reject(err)
	        }else{
	        	resolve(files);
	        }
	    });
	});
	return p;
}

var fileToJson = function(list = []){
	var data = list.map(function(item){
		var filep = `${filePath}/${item}`;
		var d = {
			name: item.replace('.xlsx', ''),
			data: XlsxUtils.parse(filep)
		};
		return d;
	});
	data.sort(function(a,b){
		return a.name.localeCompare(b.name,'zh');
	});
	return data;
}

var errorMsg = function(err){
	console.error(err);
}

getFileList(filePath).then(fileToJson).then(XlsxUtils.write)
	.catch(errorMsg)
