class MySideBar extends HTMLElement{
    connectedCallback(){
        this.innerHTML =`
        <div class="sidebar">
     <div class="line"></div>
     <div class ="social-icons">
     <a href="https://instagram.com" target="_blank">
      <img src="img/instagram.png" alt="Instagram" class="icon">
    </a>
    <a href="https://twitter.com" target="_blank">
      <img src="img/twitter.png" alt="Twitter" class="icon">
    </a>
    <a href="https://facebook.com" target="_blank">
      <img src="img/facebook.png" alt="Facebook" class="icon">
    </a>
    </div>
</div>`
    }
    
}
customElements.define("my-sidebar", MySideBar);
