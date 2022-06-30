//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Mint from './pages/Mint';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import LoaderOverlary from './components/LoadingOverlay';
import Burgers from './pages/Burgers';
import Home from './pages/Home';
import Container from './pages/Container';
import Marketplace from './pages/Marketplace';
import Staking from './pages/Staking';

const App = () => {

  const handleNotification = (type, title, msg) => {
    let duration = 3000;
    switch (type) {
      case 'info':
        NotificationManager.info(msg, title, duration);
        break;
      case 'success':
        NotificationManager.success(msg, title, duration);
        break;
      case 'warning':
        NotificationManager.warning(msg, title, duration);
        break;
      case 'error':
        NotificationManager.error(msg, title, duration);
        break;
      default:
        break;
    };
  };

  return (

    <>
      <LoaderOverlary>
        <div className="App">
          <Container>
            <Switch>
              <Route path="/" exact={true}>
                <Home handleNotification={handleNotification} />
              </Route>
              <Route path="/burgers" exact={true}>
                <Burgers handleNotification={handleNotification} />
              </Route>
              <Route path="/mint" exact={true}>
                <Mint handleNotification={handleNotification} />
              </Route>
              <Route path="/marketplace" exact={true}>
                <Marketplace handleNotification={handleNotification} />
              </Route>
              <Route path="/staking" exact={true}>
                <Staking handleNotification={handleNotification} />
              </Route>
            </Switch>
          </Container>
        </div>
      </LoaderOverlary>
      <NotificationContainer />
    </>
  );
}

export default App;