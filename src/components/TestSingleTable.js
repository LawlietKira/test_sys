import { Radio } from 'antd';
import { Button } from 'antd';
import React, { Component } from 'react'
import { Modal, Table, Form, Icon , Row , Col} from 'antd';

var Utils = require('../utils/Utils.js')
const ans = ['A', 'B', 'C', 'D']

var TestSingleTable = React.createClass({
	//var TestSingleTable = React.createClass({
	componentWillMount :function(){
		this.setState({
			question: this.props.question,
			index: this.props.index,
			nextQuestion: this.props.nextQuestion,
			prevQuestion: this.props.prevQuestion,
			disabled: this.props.inAnswer === true ? false : true
		})
	},
	componentWillReceiveProps :function(){
//		console.log('componentWillReceiveProps',this.props.inAnswer)
		this.setState({
			disabled : this.props.inAnswer === true ? false : true
		})
//		this.state.disabled = this.props.inAnswer === true ? false : true
	},
	onChange: function(e){
//		console.log('radio checked', e.target.value);
		this.state.question[this.state.index].myValue = e.target.value;
		this.state.question[this.state.index].myValueNumber = ans[e.target.value]
		this.state.question[this.state.index].isDone = true;
		this.setState({
			value: e.target.value,
		});
	},
	render: function() {
		const radioStyle = {
			display: 'block',
			fontSize: '1.5em',
			whiteSpace:'pre-wrap'
		};
		const self = this;
		var q = '';
		if(this.state.question && this.state.question.length){
			q = this.state.question[this.state.index]
		}
		var q2 = Utils.parseTests(q);
		return(
			<div>
				<div style={{width:'500px'}}>第{this.state.index + 1}题:{q2.title}</div>
				<Radio.Group style={{width:'100%'}} disabled={this.state.disabled} onChange={this.onChange} value={q2.myValue}>
				{
					q2.answers.map(function(item){
						return <Row key={self.state.index + 1 + '-' + item.value}>
							<Radio key={self.state.index + 1 + '-' + item.value} style={radioStyle} 
								value={item.value}>
							{(self.state.disabled && item.isRight)?<Icon type="check" style={{color:'green'}}/>:''}
							{item.view}</Radio>
						</Row>
					})
				}
			    </Radio.Group>
			    <div style={{marginTop:'20px'}}>
			    	<Button style={{marginLeft:'80px'}} type="default" onClick={this.state.prevQuestion}>上一题</Button> 
			    	<Button style={{marginLeft:'80px'}} type="primary" onClick={this.state.nextQuestion}>下一题</Button>
			    </div>
			</div>
		)
	}
})

export default Form.create()(TestSingleTable);