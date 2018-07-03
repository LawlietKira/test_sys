import React from 'react';
import { Form, Input, Button } from 'antd';

const Utils = require('../utils/Utils.js');
const FormItem = Form.Item;
const current_date = new Date().toLocaleDateString();

class TestAuthority extends React.Component {
	constructor(props) {
		super(props);
	}
	certify = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err && values.certify === Utils.getCertify()) {
				let testCertify = localStorage.getItem('testCertify') || {};
				testCertify[current_date] = true;
				console.log('认证成功')
			}
		});
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		return(
			<Form layout="inline" onSubmit={this.certify}>
		      <FormItem label="认证码">
		        {getFieldDecorator('certify', {
		          rules: [],
		        })(<Input />)}
		      </FormItem>
		      <Button type="primary" htmlType="submit">认证</Button>
		    </Form>
		)
	}
}

export default Form.create()(TestAuthority)