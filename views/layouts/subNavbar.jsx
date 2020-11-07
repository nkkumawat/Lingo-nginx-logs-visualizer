
var React = require('react');

function SubNavBarlayout(props) {
  var uploadButton;
  if(props.uploadButton) {
    uploadButton = (
      <div classNameName="ml-auto my-2 my-lg-0">
        <form method="POST" id="uploadForm" action="http://localhost:3001/upload" enctype="multipart/form-data">
          <input type="file" id="uploadFile" hidden name="log_file" />
        </form>
        <button classNameName="btn btn-dark rounded-pill uploadButton">upload File</button>
      </div>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-floating">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          <img src="/favicon-light.png" alt="" width="40" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="index.html">Homepage 1</a>
                <a className="dropdown-item" href="index-2.html">Homepage 2</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about.html">About</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="blog.html">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="updates.html">What's New</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact.html">Contact</a>
            </li>
          </ul>
          <div className="ml-auto my-2 my-lg-0">
            <button className="btn btn-primary rounded-pill">Download Now</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

module.exports = SubNavBarlayout;






