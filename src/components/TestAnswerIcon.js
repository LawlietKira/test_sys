import React from 'react';
import { Icon,Form } from 'antd';

var TestAnswerIcon = React.createClass({
	getInitialState:function(){
		return {
			result: this.props.result || false
		}
	},
	componentWillReceiveProps :function(nextProps){
		this.setState({
			result: nextProps.result || false
		})
	},
	render:function(){
		const res = {
			className: this.state.result === true?'answer-right':'answer-wrong',
			type: this.state.result === true?'check':'close',
		}
		return (
			<Icon className={res.className} type={res.type} />
		)
	}
})

export default Form.create()(TestAnswerIcon)