import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          venue<span>vista</span>
          <p>Find and book the perfect venue for every celebration.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>For Customers</h4>
            <a href="#">Help Center</a>
            <a href="#">Cancellation Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div>
            <h4>Partner with us</h4>
            <a href="#">List your venue</a>
            <a href="#">Owner Dashboard</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 VenueVista. All rights reserved.</div>
    </footer>
  );
}
