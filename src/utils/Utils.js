var Constant = require('./Constant.js');

var Utils = function() {
}
var chosen_code = Constant.CHOSEN_CODE,
	random = Math.random,
	floor = Math.floor;

Utils.parseTests = function(test) {
	var data = {};
	if(!test) {
		return data;
	}
	data.title = test.question;
	data.answer = test.answer;
	data.answers = test.answers.map(function(item, i) {
		var temp = {
			title: item,
			value: i,
			isRight: test.answer.indexOf(chosen_code[i]) > -1,
			view: chosen_code[i] + '.' + item
		}
		return temp;
	});
	data.type = test.type;
	data.myValue = test.myValue;
	return data
}

Utils.getScore = function(question) {
	question.forEach(function(item) {
		item.result = item.answer === item.myValueNumber;
	})
}

Utils.cloneJson = function(json) {
	return JSON.parse(JSON.stringify(json))
}

//考题乱序
Utils.randomTests = function(data) {
	var cloneData = Utils.cloneJson(data);
	var finalData = randomArr(cloneData);
	finalData.forEach(randomTest);
	return finalData;
}
//单题选项乱序
var randomTest = function(data) {
	var answers = data.answers,
		answer = data.answer,
		ansArr = randomArr(chosen_code.slice(0, answers.length)),
		finalAnswers = [],
		finalAnswer = '';
	ansArr.forEach(function(item, index){
		finalAnswers.push(answers[chosen_code.indexOf(item)])
		if(answer.indexOf(item) > -1){
			finalAnswer += chosen_code[index];
		}
	});
	data.answers = finalAnswers;
	data.answer = finalAnswer;
}

var randomArr = function(list){
	var temp = [],
		length = list.length;
	while(length > 0){
		temp.push(list.splice(floor(random() * length), 1)[0]);
		length--;
	}
	return temp;
}

module.exports = Utils;