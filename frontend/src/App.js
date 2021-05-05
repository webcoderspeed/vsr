import * as React from 'react'
import GlobalStyle from './globalStyles'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Homepage/Home';
import Navbar  from './components/Navbar/Navbar';
import SignInSide from './components/pages/Auth/SignInSide';
import SignUp from './components/pages/Auth/SignUp';
import Pricing from './components/pages/Pricing/Pricing';
import Blog from './components/pages/blog/Blog';
import BlogDetails from './components/pages/blog/BlogDetails';
import Meeting from './components/pages/Meeting/Meeting';
import NotFound from './components/NotFound/NotFound';
import CreateBlog from './components/pages/blog/CreateBlog';
 

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
        <Route exact path='/blogs' component={Blog} />
        <Route path='/blogs/create' component={CreateBlog} /> 
        <Route path='/blogs/:id' component={BlogDetails} /> 
        <Route path='/pricing' component={Pricing} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignInSide} />
        <Route path='/library'>
          <h1>Library</h1>
        </Route>
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;