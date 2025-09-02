class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
      <div class="left-section">
      <img src= "img/logo.png" alt="logo de mi empresa" class="logo" >
      <span>My beautifull project</span>
     </div>
        <nav>
          <a href="travel_recommendation.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
        </nav>
        <div class = "right-section">
        <input type="text" placeholder= "Enter destination or keu word">
        <button>Search</button>
        <button>Clean</button>
        </div>

      </header>
    `;
  }
}
customElements.define("my-header", MyHeader);
