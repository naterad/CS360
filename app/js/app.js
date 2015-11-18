var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.Route;


var App = React.createClass({
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

  login: function(event) {
      // prevent default browser submit
      //event.preventDefault();


      //this.context.router.transitionTo('/page').bind(this);

      // get data from form
      var username = this.refs.username.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value;
      // if (!username || !password) {
      //     return;
      // }
      // login via API
      // auth.login(username, password, function(loggedIn) {
      //     // login callback
      //     // if (!loggedIn)
      //     //     return this.setState({
      //     //         error: true
      //     //     });
      //     this.context.router.transitionTo('/page');
      // }.bind(this));
      this.context.router.transitionTo('page');
  },

  render: function() {
    return (
      <div className="login">

        <form className="form" onSubmit={this.login}>
        <input type="text" placeholder="Email" ref="username" autoFocus={true} />
        <br/>
        <input type="password" placeholder="Password" ref="password"/>
        <br/>
        <br/>
        <input className="btn" type="submit" value="Login" />
        </form>
        <br/>
        <br/>
        <Link to="listpage">Project List</Link>
      </div>
    );
  }
});

var ListPage = React.createClass({
  render: function() {
    return (
      <div>

        <Header/>
        <div className="body_div">
          <h1>Page with all the projects</h1>

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
          <Link to="login">back to login page</Link>
        </div>
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

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
        <Route name="listpage" path="/listpage" component={ListPage} />
        <Route name="login" path="/login" component={Login} />
        <Route name="projectpage" path="/projectpage" component={ProjectPage} />
        <Route name="profile" path="/profile" component={Profile} />
        </Route>
      </Router>
);

ReactDOM.render(routes, document.body);
