//Laddnings-ikon
class Loading1 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #loading1 {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 100;
                    width: 100px;
                    height: 100px;
                    background-color: rgb(0, 0, 0);
                    background-image: url(simple-pre-loader/images/loader-128x/Preloader_6.gif);
                    background-repeat: no-repeat;
                    background-position: center;
                }
            </style>
  
        `;
    }
  }
  customElements.define('loading-1', Loading1);