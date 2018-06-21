var Utils = function(){
	
}
var r = ['A', 'B', 'C', 'D'];

Utils.parseTests = function(test){
	var data = {};
	if(!test){
		return data;
	}
	data.title = test.question;
	data.answer = test.answer;
	data.answers = test.answers.map(function(item, i){
		var temp = {
			title: item,
			value: i,
			isRight: test.answer.indexOf(r[i]) > -1,
			view: r[i] + '.' + item
		}
		return temp;
	});
	data.type = test.type;
	data.myValue = test.myValue;
	return data
}

Utils.getScore = function(question){
	question.forEach(function(item){
		item.result = item.answer === item.myValueNumber;
	})
}

Utils.cloneJson = function(json){
	return JSON.parse(JSON.stringify(json))
}


module.exports = Utils;
