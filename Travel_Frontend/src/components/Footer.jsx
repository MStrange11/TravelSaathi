import "./css/FooterStyles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>TravelSaathi</h1>
          <p>Where travellers connect.</p>
        </div>
        <div>
          <a href="/">
          <i className="fab fa-brands fa-facebook-square"></i>
          </a>
          <a href="/">
          <i className="fab fa-brands fa-instagram-square"></i>
          </a>
          
          <a href="/">
          <i className="fab fa-brands fa-twitter-square"></i>
          </a>
          
        </div>
      </div>

      <div className="bottom">
        <div>
          <h4>Project</h4>
          <a href="/">Changelog</a>
          <a href="/">Status</a>
          <a href="/">Footer</a>
          <a href="/">All Versions</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="/">GitHub</a>
          <a href="/">Issues</a>
          <a href="/">Project</a>
          <a href="/">Twitter</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="/contact">Support</a>
          <a href="/">Troubleshooting</a>
          <a href="/contact">Contact us</a>
        </div>
        <div>
          <h4>Others</h4>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">License</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
