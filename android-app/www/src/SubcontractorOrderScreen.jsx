var React = require('react'),
	Router = require('react-router'),
	_ = require('underscore'),
	dateFormat = require('dateformat'),
	Button = require('react-bootstrap').Button;

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

var SubcontractorOrderScreen = React.createClass({
	mixins: [Router.State],
	render: function() {
		return (
			<div id="container"></div>
		);
	},
	handleClickBack: function() {
		window._router.transitionTo('subcontractor', { id : this.props.id });
	},
	componentDidMount: function() {
		this.showData();
	},
	componentDidUpdate: function() {
		this.showData();
	},
	showData: function() {
		let $this = this,
			orders,
			sc_data,
			content = [],
			ajaxes = [];

		$this.props.id = this.getParams().id;

		ajaxes[0] = Promise.resolve($.ajax({
				url:`/subcontractor.json/${$this.props.id}`,
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			sc_data = data;
			sc_data.id = $this.props.id;
		});

		ajaxes[1] = Promise.resolve($.ajax({
				url: `/subcontractor/orders/${$this.props.id}`,
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			orders = 
				_.sortBy(_.map(data, (order, id) => {
					order.id = id;
					return order;
				}), (order) => -new Date(order.date).getTime()
			)
		});

		// when all ajax queries are succesful
		// no error handling here :(
		Promise.all(ajaxes).then(() => {

			let headerRow = (
				<tr className="show-grid header-grid">
					<th xs={3} md={3}>Status</th>
					<th xs={3} md={3}>Date</th>
					<th xs={3} md={3}>Customer name</th>
					<th xs={3} md={3}>Address</th>
					<th xs={3} md={3}>Comment</th>
				</tr>
			),
			content = _.map(_.filter(orders, (order) => order.complete === 0), (order) => {
				return (
					<tr className="table table-striped table-hover">
						<td xs={3} md={3}>Active</td>
						<td xs={3} md={3}>{dateFormat(new Date(order.date), "dd.mm.yy hh:mm")}</td>
						<td xs={3} md={3}>{order.name}</td>
						<td xs={3} md={3}>{order.address}</td>
						<td xs={3} md={3}>{order.add_info}</td>
					</tr>
				);
			});

			content.push(
				_.map(_.filter(orders, (order) => order.complete === 1), (order) => {
					return (
						<tr className="table table-striped table-hover row-complete">
							<td xs={3} md={3}>Complete</td>
							<td xs={3} md={3}>{dateFormat(new Date(order.date), "dd.mm.yy hh:mm")}</td>
							<td xs={3} md={3}>{order.name}</td>
							<td xs={3} md={3}>{order.address}</td>
							<td xs={3} md={3}>{order.add_info}</td>
						</tr>
					);
				})
			);

			React.render(
				<div className="bs-component">
                    <div className="page-header">
                        <h2 className="header-orders">Orders</h2>
                    </div>
                    <table className="table table-striped table-hover table-orders">
                        <thead>
                            {headerRow}
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                    <Button className="btn btn-raised btn-warning" id="back-button" onClick={this.handleClickBack}>Back</Button>

                </div>,

				document.getElementById('container')
			);
		});
	}
});

module.exports = SubcontractorOrderScreen;