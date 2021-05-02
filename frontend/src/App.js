import * as React from 'react'
import GlobalStyle from './globalStyles'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Homepage/Home';
import Navbar  from './components/Navbar/Navbar';
import SignInSide from './components/pages/Auth/SignInSide';
import SignUp from './components/pages/Auth/SignUp';
import Pricing from './components/pages/Pricing/Pricing';
import Blog from './components/pages/Blog/Blog';
import Meeting from './components/pages/Meeting/Meeting'

function App() {

  return (
    <Router>
      <GlobalStyle />
      <Navbar />  
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/courses'>
          <h1>Courses</h1>
        </Route>
        <Route path='/meetings' component={Meeting} />
        <Route path='/blog' component={Blog} />
        <Route path='/pricing' component={Pricing} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignInSide} />
      </Switch>
    </Router>
  );
}

export default App;