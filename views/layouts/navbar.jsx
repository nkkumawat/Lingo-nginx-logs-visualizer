var React = require('react');

function NavBarlayout(props) {
  var uploadButton;
  if(props.uploadButton) {
    uploadButton = (
      <div className="ml-auto my-2 my-lg-0">
        <form method="POST" id="uploadForm" action="/upload" enctype="multipart/form-data">
          <input type="file" id="uploadFile" hidden name="log_file" />
        </form>
        <button className="btn btn-dark rounded-pill uploadButton">upload File</button>
      </div>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-floating">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/favicon.png" alt="" width="100" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-lg-5 mt-3 mt-lg-0">
          <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item dropdown active">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Logs</a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/nginx">Nginx Logs</a>
                <a className="dropdown-item" href="/nginx/route-vs-count">Route vs Count</a>
                <a className="dropdown-item" href="/nginx/timeline">Status Timeline</a>
              </div>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="about.html">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="updates.html">What's New</a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li> */}
          </ul>
          {uploadButton}
        </div>
      </div>
    </nav>
  );
}

module.exports = NavBarlayout;


