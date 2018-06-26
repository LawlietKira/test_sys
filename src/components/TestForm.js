import React from 'react';
import { Modal, Table, DatePicker, Form, Row, Col, Input, Button, Icon, message } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import TestSingleTable from './TestSingleTable'
import TestMultipleTable from './TestMultipleTable'
import TestAnswerIcon from './TestAnswerIcon'

var Utils = require('../utils/Utils.js')

var tests = require('../../assets/json/tests.json')
const FormItem = Form.Item;
var times = 1;
var TestForm = React.createClass({
	getInitialState: function() {
		let testsId= this.props.params.id,
			roundTests = this.roundTests(tests[testsId].data);
		return {
			testsId: testsId,
			testData: tests[testsId].data,
			currentIndex: 0,
			inAnswer: true,
			questions: roundTests
		};
	},
	componentWillUpdate:function(props){
		let testsId= props.params.id;
		this.state.questions= this.roundTests(tests[testsId].data);
		this.state.currentIndex = 0;
		this.state.inAnswer = true;
	},
	roundTests: function(data){
		let muddleData = Utils.randomTests(data);
		return muddleData;
	},
	getTests:function(){
		let testsId= this.props.params.id;
		this.setState({
			times:times++,
			currentIndex: 0,
			inAnswer: true,
			questions: this.roundTests(tests[testsId].data)
		})
	},
	getScore: function() {
		let q = this.state.questions;
//		console.log(q)
		Utils.getScore(q);
		this.setState({
			inAnswer: false
		})
	},
	nextQuestion: function() {
		var c = this.state.currentIndex + 1;
		if(c >= this.state.questions.length) {
			message.warning('已是最后一题！');
		} else {
			this.setState({
				currentIndex: c
			})
		}
	},
	prevQuestion: function() {
		var c = this.state.currentIndex - 1;
		if(c < 0) {
			message.warning('已是第一题！');
		} else {
			this.setState({
				currentIndex: c
			})
		}
	},
	chooseQuestion: function(num) {
//		console.log(num)
		this.setState({
			currentIndex: num
		});
	},
	render: function() {
		const { getFieldDecorator } = this.props.form,
			self = this;
		var cons = [];
		const q = self.state.questions,
			current_type = q[self.state.currentIndex].type;
		for(var i = 0; i < q.length; i++) {
			if(i % 6 === 0) {
				cons.push([{
					index: i,
					isDone: q[i].isDone,
					result: q[i].result
				}])
			} else {
				cons[cons.length - 1].push({
					index: i,
					isDone: q[i].isDone,
					result: q[i].result
				})
			}
		}
		return(
			<div>
				<div style={{textAlign:'center',width:'800px',fontSize:'2em',marginBottom:'20px'}}>{this.props.location.query.title}</div>
			    <Form layout="inline" >
			        <Button type="primary" style={{marginLeft:'80px'}} onClick={this.getTests}>获取题目</Button>
			        <Button type="primary" style={{marginLeft:'80px'}} onClick={this.getScore}>提交</Button>
		      </Form>
		      <Row type="flex" style={{marginTop:'20px'}}>
		      	<Col span={12} order={1}>
				    <div style={{width:'500px',fontSize:'1.5em'/*,border:'solid 1px black'*/}}>
				    {
				    	current_type === 'S'?
				    	<TestSingleTable key={this.state.currentIndex + new Date().getTime()} inAnswer={this.state.inAnswer}
			      			question={this.state.questions} index={this.state.currentIndex} times={this.state.times}
			      			nextQuestion={this.nextQuestion} prevQuestion={this.prevQuestion}/> :
			      		<TestMultipleTable key={this.state.currentIndex + new Date().getTime()} inAnswer={this.state.inAnswer}
			      			question={this.state.questions} index={this.state.currentIndex} times={this.state.times}
			      			nextQuestion={this.nextQuestion} prevQuestion={this.prevQuestion}/>
				    }
			      	</div>
			    </Col>
			    <Col span={10} order={2}>
			    	<div className="gutter-example" style={{width:'400px',fontSize:'1.5em',border:'solid 1px black'}}>
			    		{cons.map(function(item){
			    			return <Row key={'row' + Math.random()} gutter={2}>
			    				{item.map(function(it){
			    				  return <Col key={'col' + it.index} className="gutter-row" span={4}>
							        <div className={"gutter-box" + (self.state.currentIndex === it.index?' current':'')
							        	+ (it.isDone?' done':'')}
							        	onClick={self.chooseQuestion.bind(self,it.index)}>
							        {self.state.inAnswer?'':<TestAnswerIcon result={it.result}/>}{it.index + 1}</div>
							      </Col>
			    				})}
						    </Row>
			    		})}
			    	</div>
			    </Col>
			  </Row>
		  </div>
		)
	}
});

export default Form.create()(TestForm)