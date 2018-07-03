var disturb = function(number){
	var t = parseInt(number * 0.618, 10) + '';
	if(t.length < 8){
		t = '0' + t;
	}
	return t;
}

var base_number = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	base_number_length = base_number.length,
	date = new Date().toISOString();
	date = date.substr(0,10).replace(/-/g, '');
	date = disturb(date),
	code = '';
for(var i=0; i<date.length/2; i++){
	var tempNumber = Number(date.substr(2*i, 2));
	code += base_number[tempNumber%base_number_length]
}
console.log(code)

