import React from 'react';
import { connect } from "react-redux";
import {Cell, Grid, Row} from '@material/react-layout-grid';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  askPermission() {
    // use both promise and callback because which one will work depends on browser API version
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
      .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
          console.log('We weren\'t granted permission.');
        }
      });
  }

  async componentDidMount() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Your browser sucks, use another one');
      return;
    }

    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: 'BM6SiAnaGYckcmbztRXz5h2eC65gHcMZH-0NOrqEQ6OlAtJUDsRPX-nbeRhHANpZBzLuhHVPXVYNTRhRFB4-KYY',
    };

    try {
      await this.askPermission();
      // here we must use the process.env.PUBLIC_URL for some wired reasons...
      const registration = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/custom-service-worker.js`);

      console.log(registration);
      await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
      console.log(JSON.stringify(pushSubscription));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
        <Grid className='gridContainer'>
          <Row className='rowContainer'>
            <Cell columns={3} className='friendListContainer'></Cell>
            <Cell columns={8} className='chatContainer'></Cell>
            <Cell columns={1} className='settingsContainer'></Cell>
          </Row>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

export default connect(
  mapStateToProps,
  null
)(Home);