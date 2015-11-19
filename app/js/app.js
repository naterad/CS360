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
    return (
      <div>

        <Header/>
        <div className="body_div">
          <h1>Project List</h1>
          <div className="list_item">Project 1   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  456 E. 3535 N. Orem, UT</div>
          <div className="list_item">Project 2   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  603 E. 225 S. Salt Lake City, UT</div>
          <div className="list_item">Project 3  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   800 E. 1115 N. Provo, UT</div>
          <div className="list_item">Project 4</div>
          <div className="list_item">Project 5</div>
          <div className="list_item">Project 6</div>

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
var Signup=React.createClass({
  render: function(){
    return(
      <div className="signup">
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

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
        <Route name="listpage" path="/listpage" component={ListPage} />
        <Route name="login" path="/login" component={Login} />
	<Route name="signup" path="/signup" component={Signup} />
        <Route name="projectpage" path="/projectpage" component={ProjectPage} />
        <Route name="profile" path="/profile" component={Profile} />
        </Route>
      </Router>
);

ReactDOM.render(routes, document.body);
