import React from 'react';
import { connect } from "react-redux";
import List, { ListItem } from '@material/react-list';
import Drawer from '@material/react-drawer';

import './Misc.scss';

class Misc extends React.Component {
  constructor(props) {
  	super(props);
  	this.tabMap = {
  		0: 'friendList',
			1: 'friendRequest',
			2: 'userProfile',
			3: 'settings'
		};
  	this.tabMapReverse = {
  		friendList: 0,
			friendRequest: 1,
			userProfile: 2,
			settings: 3
		};
	}

  handleSelect(index) {
  	this.props.selectTab(this.tabMap[index]);
  }

  render() {

  	return (
  		<Drawer className='misc-drawer-container'>
				<List singleSelection selectedIndex={this.tabMapReverse[this.props.tab]} handleSelect={(index) => this.handleSelect(index)}>
					<ListItem className='list-item'>
						<i className='material-icons'>people</i>
					</ListItem>
					<ListItem className='list-item'>
						<i className='material-icons'>add</i>
					</ListItem>
					<ListItem className='list-item'>
						<i className='material-icons'>person_pin</i>
					</ListItem>
					<ListItem className='list-item'>
						<i className='material-icons'>settings_applications</i>
					</ListItem>
				</List>
  		</Drawer>
  	);
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

export default connect(
  mapStateToProps,
  null
)(Misc);