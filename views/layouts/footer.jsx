var React = require('react');
function FooterLayout(props) {
  return (
    <div className="page-footer-section bg-dark fg-white">
      <div className="container mb-5">
        <div className="row justify-content-center text-center wow fadeInUp">
          <div className="col-lg-8">
            <div className="text-center mb-3">
              <img src="/favicon-light.png" alt="" height="80" />
            </div>
            <h3 className="mb-3"><span className="fg-primary">Mob</span>ster</h3>
            <p className="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/> Expedita voluptates earum minima reiciendis consectetur veniam aut dignissimos</p>

            <ul className="nav justify-content-center py-3">
              <li className="nav-item"><a href="index.html" className="nav-link fg-white px-4">Home</a></li>
              <li className="nav-item"><a href="" className="nav-link fg-white px-4">Key Features</a></li>
              <li className="nav-item"><a href="" className="nav-link fg-white px-4">Pricing</a></li>
              <li className="nav-item"><a href="" className="nav-link fg-white px-4">Testimonials</a></li>
              <li className="nav-item"><a href="" className="nav-link fg-white px-4">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = FooterLayout;
