const Contact = () => (
  <section className="section">
    <h2>Contact Us</h2>
    <p>Tell us about your estate and we will tailor a demo.</p>
    <div className="grid">
      <div className="card">
        <h3>Reach out</h3>
        <p>Email: info@ceyloncoco.com</p>
        <p>Phone: +94 11 123 4567</p>
      </div>
      <div className="card">
        <h3>Send a message</h3>
        <form className="grid">
          <input placeholder="Name" />
          <input placeholder="Email" />
          <textarea placeholder="Your message" rows="4" />
          <button className="cta-button" type="button">Send</button>
        </form>
      </div>
    </div>
  </section>
);

export default Contact;
