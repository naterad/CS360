var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.Route;
var History = ReactRouter.History;

var App = React.createClass({
  // context so the componevnt can access the router
  contextTypes: {
    router: React.PropTypes.func
  },

  // initial state
  getInitialState: function() {
    return {
      // the user is logged in
      loggedIn: auth.loggedIn()
    };
  },

  // callback when user is logged in
  setStateOnAuth: function(loggedIn) {
    this.state.loggedIn = loggedIn;
  },

  // when the component loads, setup the callback
  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
  },

  // logout the user and redirect to home page
  logout: function(event) {
    auth.logout();
    this.context.router.replaceWith('/');
  },
  render: function() {
    return (
      <div>
      <div className="hidden">
      <nav className="navbar navbar-default" role="navigation">
      <div className="container">
      <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/">Jack</a>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
      <li><Link to="page">Page</Link></li>
      </ul>
      </div>
      </div>
      </nav>
      </div>


      <div className="container">
      {this.props.children || <Login/>}
      </div>
      </div>
    );
  }
});

var Login = React.createClass({
  mixins: [ History ],
  getInitialState: function() {
    return {
      // there was an error on logging in
      error: false
    };

  },
  login: function(event) {

    // get data from form
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    if (!email || !password) {
      return;
    }
    // login via API
    auth.login(email, password, function(loggedIn) {
      // login callback
      if (!loggedIn)
      return this.setState({
        error: true
      });
      console.log('logged in');
      this.history.pushState(null, '/listpage');
    }.bind(this));
  },
  render: function() {
    return (
      <div className="login">

      <form className="form" onSubmit={this.login}>
      <input type="text" placeholder="Email" ref="email" autoFocus={true} />
      <br/>
      <input type="password" placeholder="Password" ref="password"/>
      <br/>
      <br/>
      <input className="btn" type="submit" value="Login" />
      {this.state.error ? (
        <div className="alert">Invalid email or password.</div>
      ) : null}
      </form>
      <Link to="signup"><input className="btn" type="button" value="Signup"/></Link>
      <br/>
      <br/>
      <Link to="listpage">Project List</Link>
      </div>
    );
  }
});

var ListPage = React.createClass({
  render: function() {
    var url = "/api/projects";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: {
      },
      // on success, store a login token
      success: function(res) {
        console.log("it worked");
        if (cb)
        cb(true);
        this.onChange(true);
      }.bind(this),
      error: function(xhr, status, err) {
        // if there is an error, remove any login token
        console.log("didn't worked");
        // delete localStorage.token;
        // if (cb)
        // cb(false);
        // this.onChange(false);
      }.bind(this)
    });

    return (
      <div>
      <Header/>
      <div className="body_div">
      <h1>Project List</h1>
      <h2>{localStorage.email}</h2>
      <h2>{localStorage.token}</h2>
      <Link to="addproject">add project</Link>
      <div className="list_item">Project 1   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  456 E. 3535 N. Orem, UT</div>
      <div className="list_item">Project 2   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  603 E. 225 S. Salt Lake City, UT</div>
      <div className="list_item">Project 3  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   800 E. 1115 N. Provo, UT</div>
      <div className="list_item">Project 4  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   800 E. 1115 N. Provo, UT</div>
      <div className="list_item">Project 5  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   800 E. 1115 N. Provo, UT</div>
      <div className="list_item">Project 6  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   800 E. 1115 N. Provo, UT</div>

      <Link to="login">back to login page</Link>
      </div>
      </div>
    );
  }
});

var ProjectPage = React.createClass({
  render: function() {
    return (
      <div>

      <Header/>
      <div className="body_div">
      <h1>Project Page</h1>
      <div className="proj_body">
      <p>Name: Bob Dylan</p>
      <p>Address: 509 E. 2800 N. Cedar Hills, UT</p>
      <p>Start Date: Oct 15, 2015</p>
      <p>End Date: Dec 10, 2015</p>
      </div>
      <Comment/>
      <Comment/>
      <Comment/>
      <Link to="login">back to login page</Link>
      </div>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
      <p>Name , Date </p>
      <p>comment here</p>

      </div>
    );
  }
});

var Profile = React.createClass({
  render: function() {
    return (
      <div>

      <Header/>
      <div className="body_div">
      <h1>Profile</h1>
      <Link to="login">back to login page</Link>
      </div>
      </div>
    );
  }
});

var AddProject = React.createClass({
  mixins: [ History ],
  // initial state
  getInitialState: function() {
    return {
      // there was an error registering
      error: false
    };
  },

  // handle regiser button submit
  addnewproject: function(event) {
    //debugger;
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var owner_name = this.refs.owner_name.value;
    var project_name = this.refs.project_name.value;
    var address = this.refs.address.value;
    var carrier = this.refs.carrier.value;
    var start_date = this.refs.start_date.value;
    var end_date = this.refs.end_date.value;
    var claim = this.refs.claim.value;
    if (!owner_name || !project_name || !address ||!carrier ||!start_date || !end_date|| !claim ) {
      return;
    }

    // register via the API
    //project.addNew(owner_name,project_name, address, carrier, start_date, end_date, claim, function(loggedIn) {
    project.addNew(owner_name, function(loggedIn) {
      // register callback
      if (!loggedIn)
      return this.setState({
        error: true
      });
      console.log('project added');
      //this.context.router.transitionTo('/list');
      this.history.pushState(null, '/projectpage');
    }.bind(this));
  },

  render: function() {
    return (
      <div>

      <Header/>
      <div className="body_div">
      <h1>New Project</h1>

      <div className="newproject">
      <form className="form">
      <input type="text" placeholder="Home owner name" ref="owner_name"/>
      <input type="text" placeholder="Project number" ref="project_name"/>
      <input type="text" placeholder="Address" ref="address"/>
      <input type="text" placeholder="Carrier" ref="carrier"/>
      <input type="text" placeholder="Job type" ref="job_type"/>
      <input type="text" placeholder="start date" ref="start_date"/>
      <input type="text" placeholder="estimated end date" ref="end_date"/>
      <input type="text" placeholder="claim number" ref="claim"/>
      <br />
      <br />
      <input className="btn addsubmit" onClick={this.addnewproject} type="submit" value="Submit"/>
      {this.state.error ? (
        <div className="alert">Invalid input.</div>
      ) : null }
      </form>
      </div>

      <Link to="listpage">back to project list</Link>
      </div>
      </div>
    );
  }
});
var Signup=React.createClass({
  mixins: [ History ],
  // initial state
  getInitialState: function() {
    return {
      // there was an error registering
      error: false
    };
  },

  // handle regiser button submit
  register: function(event) {
    //debugger;
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var first = this.refs.first.value;
    var last = this.refs.last.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    var confirm = this.refs.confirm.value;
    if (!first || !last || !password||!email||!confirm||(confirm!=password)) {
      return;
    }
    // register via the API
    auth.register(first,last, email, password, function(loggedIn) {
      // register callback
      if (!loggedIn)
      return this.setState({
        error: true
      });
      console.log('registered');
      //this.context.router.transitionTo('/list');
      this.history.pushState(null, '/listpage');
    }.bind(this));
  },
  render: function(){
    return(
      <div className="signup" onSubmit={this.register}>
      <form className="form">
      <input type="text" placeholder="First name" ref="first"/>
      <br />
      <input type="text" placeholder="Last name" ref="last"/>
      <br />
      <input type="text" placeholder="Email" ref="email"/>
      <br />
      <input type="password" placeholder="Password" ref="password"/>
      <br />
      <input type="password" placeholder="Confirm Password" ref="confirm"/>
      <br />
      <input type="submit" className="btn" value="Register"/>
      {this.state.error ? (
        <div className="alert">Invalid email or passwords do not match.</div>
      ) : null }
      </form>
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
      <div className="brand">Jack</div>
      <div className="navbar">


      <span className="navbar_p"><Link to="listpage">Project List</Link></span>
      <span className="navbar_p"><Link to="projectpage">Project Page</Link></span>
      <span className="navbar_p"><Link to="profile">Profile</Link></span>

      </div>
      </div>
    );
  }
});
var project = {
  addNew: function(project_name, cb) {
    console.log("in the addNew");
    //console.log(cb);
    // submit request to server, call the callback when complete
    var url = '/api/projects';
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      headers: {'Authorization': localStorage.token},
      data: {
        // owner_name: owner_name,
        title: project_name
        // address: address,
        // carrier: carrier,
        // start_date: start_date,
        // end_date: end_date,
        // claim: claim
      },
      // on success, store a login token
      success: function(res) {
        console.log("success");
        //localStorage.owner_name = res.owner_name;
        //localStorage.email = res.email;
        //localStorage.email = res.email;

        if (cb)
          cb(true);
          this.onChange(true);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error with adding a new project");
        console.log(err);
        // if there is an error, remove any login token
        // delete localStorage.token;
        // if (cb)
        //     cb(false);
        // this.onChange(false);
      }.bind(this)
    });
  }

};

// authentication object
var auth = {
  register: function(first,last, email, password, cb) {
    // submit request to server, call the callback when complete
    var url = "/api/users/register";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: {
        first: first,
        last: last,
        email: email,
        password: password
      },
      // on success, store a login token
      success: function(res) {
        localStorage.token = res.token;
        console.log(email);
        console.log(res.token);
        localStorage.email = email;
        if (cb)
        cb(true);
        this.onChange(true);
      }.bind(this),
      error: function(xhr, status, err) {
        // if there is an error, remove any login token
        delete localStorage.token;
        if (cb)
        cb(false);
        this.onChange(false);
      }.bind(this)
    });
  },
  // login the user
  login: function(email, password, cb) {
    delete localStorage.token;
    // submit login request to server, call callback when complete
    cb = arguments[arguments.length - 1];
    // check if token in local storage
    if (localStorage.token) {
      if (cb)
      cb(true);
      this.onChange(true);
      return;
    }
    // submit request to server
    var url = "/api/users/login";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: {
        email: email,
        password: password
      },
      success: function(res) {
        // on success, store a login token
        localStorage.token = res.token;
        localStorage.email = email;
        if (cb)
        cb(true);
        this.onChange(true);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('error!');
        // if there is an error, remove any login token
        delete localStorage.token;
        if (cb)
        cb(false);
        this.onChange(false);
      }.bind(this)
    });
  },
  // get the token from local storage
  getToken: function() {
    return localStorage.token;
  },
  // get the email from local storage
  getEmail: function() {
    return localStorage.email;
  },
  // logout the user, call the callback when complete
  logout: function(cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },
  // check if user is logged in
  loggedIn: function() {
    console.log(!!localStorage.token);
    return !!localStorage.token;
  },
  // default onChange function
  onChange: function() {},
};
// Run the routes
var routes = (
  <Router>
  <Route name="app" path="/" component={App}>
  <Route name="listpage" path="/listpage" component={ListPage} />
  <Route name="login" path="/login" component={Login} />
  <Route name="addproject" path="/addproject" component={AddProject} />
  <Route name="signup" path="/signup" component={Signup} />
  <Route name="projectpage" path="/projectpage" component={ProjectPage} />
  <Route name="profile" path="/profile" component={Profile} />
  </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
