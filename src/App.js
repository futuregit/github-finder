import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import PropsType from 'prop-types';

const App = ({  }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlertState] = useState(null);


  //Get single Github user
  const getUser = async (username) => {
    setLoading(false)
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  //Get users repos
  const getUserRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false)
  };

  //Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  //Set Alert
  const setAlert = (msg, type) => {
    setAlertState({ msg, type})

    setTimeout(() => setAlertState(null), 5000);
  }
    
    return (
      <GithubState>
        <Router>
          <div className="App">
            <Navbar title={"123"}/>
            <div className='container'>
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search 
                      clearUsers={clearUsers} 
                      showClear={users.length > 0 ? true: false} 
                      setAlert={setAlert} 
                    />
                    <Users loading={loading} users={users}/>
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props => (
                  <User 
                    {...props} 
                    getUser={getUser} 
                    getUserRepos={getUserRepos} 
                    user={user}
                    repos={repos} 
                    loading={loading}
                  />
                )} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    );
};

App.propTypes = {
  searchUsers: PropsType.func.isRequired
}


export default App;
