import React from 'react';
import { Form, Input, Button,Icon,Popover } from 'antd';
import Constant from '../utils/Constant.js';

const Utils = require('../utils/Utils.js');
const FormItem = Form.Item;
const current_date = new Date().toLocaleDateString();

class TestAuthority extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {}
	certify = (e) => {
		e.preventDefault();
		let self = this;
		self.props.form.validateFields((err, values) => {
			let value = values.certify || ''
			if(!err && value.toLowerCase() === Utils.getCertify()) {
				localStorage.setItem('certify', value.toLowerCase());
				self.setState({
					certify: true
				})
				console.log('认证成功');
			}else{
				console.log('认证码提示：0.618');
			}
		});
	}
	render() {
		this.state.certify = localStorage.getItem('certify').toLowerCase() === Utils.getCertify();
		const {
			getFieldDecorator
		} = this.props.form;
		let certifyButton = <Button type="primary" htmlType="submit" style={{margin:'auto 10px' }}>认证</Button>;
		if(this.state.certify){
			certifyButton = <Button key="certify" type="primary" style={{margin:'auto 10px' }}>已认证</Button>;
		}
		return(
			<Form layout="inline" onSubmit={this.certify} >
		      <FormItem label="认证码">
		        {getFieldDecorator('certify', {
		          rules: [],
		        })(<Input disabled={this.state.certify} maxLength="4" />)}
		      </FormItem>
		      {certifyButton}
		      <Popover content={Constant.CERTIFY_WARN} trigger="hover">
		      	<Icon style={{ fontSize: 16, color: 'orange' }}  type="info-circle" />
		      </Popover>
		    </Form>
		)
	}
}

export default Form.create()(TestAuthority)