var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  Navigation = Router.Navigation,
  Link = Router.Link;


  require('react-bootstrap');
  require('../src/css/style.css');
  require("../src/css/login.css");

var LoginScreen = require('./LoginScreen.jsx'),
    CreateOrder = require('./CreateOrder.jsx'),
	SubcontractorsScreen = require('./SubcontractorsScreen.jsx'),
	LogoutButton = require('./LogoutButton.jsx'),
	SubcontractorScreen = require('./SubcontractorScreen.jsx'),
	ManufacturerDashboard = require('./ManufacturerDashboard.jsx'),
	OrderListScreen = require('./OrderListScreen.jsx'),
	SubcontractorOrderScreen = require('./SubcontractorOrderScreen.jsx'),
	HomeLink = require('./HomeLink.jsx');


var App = React.createClass({
	mixins: [Router.State, Navigation],
	getInitialState: function () {
		return {
			loggedIn: true,
			user: 'admin',
			group: 0
		}
	},
	logIn: function (_state, _user, _group) {

		this.setState({
	      	loggedIn: _state,
	      	user: _user || '',
	      	group: typeof _group === 'undefined' ? 2 : _group
	    });

	    if (_state && _group === 0) {
	    	this.transitionTo('manufacturer_dashboard');
	    } else if (_state && _group === 1) {
	    	this.transitionTo('subcontractor', {id : _user});
	    } else {
	    	this.transitionTo('loginscreen');
	    }
	},
	componentDidMount: function() {
		$.material.init();
	},
	render: function () {
		let $this = this,
			imgStyle = {
				width: '40px',
				height: '40px'
			};
			
		return (
			<div className="bs-container">
				<div className="header clearfix">
					<ul className="nav nav-pills pull-right nav-logout">
						<li role="presentation" className="active" id="nav-logout-li">
							{$this.state.loggedIn ?	
								<div className="current-user">
									<img className="img-circle" style={imgStyle} src="icons/04.jpg" />
									<span> {$this.state.user}</span>
								</div>
							: '' }
						</li>
			            <li role="presentation" className="active" id="nav-logout-li">
			            	<LogoutButton loggedIn={this.state.loggedIn} logIn={this.logIn} />
			            </li>
	          		</ul>
                    <h3 id="logo" className="text-muted">
                    	<HomeLink user={$this.state.user} group={$this.state.group} />   
					</h3>
				</div>
				<div id="bs-container content" className="jumbotron">
					{$this.state.loggedIn ? <RouteHandler user={$this.state.user} group={$this.state.group} /> : <LoginScreen logIn={$this.logIn} />}
				</div>
			</div>
		);
	}
});

var routes = (
	<Route name="app" path="/app" handler={App} >
		<Route name="loginscreen" path="/login" handler={LoginScreen} />
        <Route name="createorder" path="/createorder" handler={CreateOrder} />
        <Route name="orders" path="/orders" handler={OrderListScreen} />
        <Route name="sc_orders" path="/orders/:id" handler={SubcontractorOrderScreen} />
        <Route name="manufacturer_dashboard" path="/" handler={ManufacturerDashboard} />
		<Route name="subcontractors" path="/subcontractors" handler={SubcontractorsScreen} />
		<Route name="subcontractor" path="/subcontractor/:id" handler={SubcontractorScreen} />
	</Route>
);

window._router = Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById("body"));
});
