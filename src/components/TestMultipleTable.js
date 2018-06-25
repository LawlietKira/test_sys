import { Radio } from 'antd';
import { Button } from 'antd';
import React, { Component } from 'react'
import { Modal, Table, Form, Icon,Checkbox,Row,Col } from 'antd';

var Constant = require('../utils/Constant.js');
var Utils = require('../utils/Utils.js')

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const chosen_code = Constant.CHOSEN_CODE;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];


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
			disabled : !this.props.inAnswer
		})
//		this.state.disabled = this.props.inAnswer === true ? false : true
	},
	onChange: function(value){
		this.state.question[this.state.index].myValue = value;
		this.state.question[this.state.index].myValueNumber = value.reduce(function(pre, cur){
			return pre + chosen_code[cur]
		}, '')
		this.state.question[this.state.index].isDone = true;
		this.setState({
			value: value,
		});
	},
	render: function() {
		const radioStyle = {
			display: 'block',
			fontSize: '1.5em'
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
				<Checkbox.Group disabled={this.state.disabled} style={{width:'100%'}} 
					onChange={self.onChange} defaultValue={q2.myValue}>
				{
					q2.answers.map(function(item){
						return <Row key={self.state.index + 1 + '-' + item.value}><Col>
							<Checkbox style={radioStyle} key={self.state.index + 1 + '-' + item.value} 
							value={item.value}>
							{(self.state.disabled && item.isRight)?<Icon type="check" style={{color:'green'}}/>:''}
							{item.view}</Checkbox>
						</Col></Row>
					})
				}
				</Checkbox.Group>
			    <div style={{marginTop:'20px'}}>
			    	<Button style={{marginLeft:'80px'}} type="default" onClick={this.state.prevQuestion}>上一题</Button> 
			    	<Button style={{marginLeft:'80px'}} type="primary" onClick={this.state.nextQuestion}>下一题</Button>
			    </div>
			</div>
		)
	}
})

export default Form.create()(TestSingleTable);