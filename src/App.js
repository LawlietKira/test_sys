import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router'
import ReactDOM from 'react-dom';
import logo from '../assets/image/logo.png'
require('./App.css')

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
	state = {
		collapsed: false,
	};
	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	}
	render() {
		return(
			<div>
			  	<div id="nav">
					<Link to="/"><img src={logo} id="logo" /></Link>
					<Menu theme="dark" style={{width: 200}} mode="inline">
						<SubMenu key="menu1" title={<span><Icon type="calendar" /><span>考题信息</span></span>}>
					  		<Menu.Item key="1">
								<Icon type="appstore-o" />
								<span className="nav-text">考题详情</span>
								<Link to="/testForm"></Link>
						    </Menu.Item>
				    	</SubMenu>
				    </Menu>
				</div>
				<div id="content">
					<Menu mode="horizontal">
						<SubMenu title={<span><Icon type="user"/>{ this.state.username }</span>}>
						<Menu.Item key="setting:1"><Link to="/">退出</Link></Menu.Item>
						    </SubMenu>
						</Menu>
						<div style={{ margin: '24px 16px 0' }}>
				  		<div style={{ padding: 24, background: '#fff', minHeight: 720 }}>
				        	{this.props.children}
				      	</div>
			    	</div>
			  	</div>
			</div>
		);
	}
}

export default App;
//ReactDOM.render(<App />, document.getElementById('root'));