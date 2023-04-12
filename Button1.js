//Byt burk-knapp
class Button1 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #button1 {
                    width: 100px;
                    background-color: transparent;
                    border: 0.5px solid white;
                    font-family: "Lato", sans-serif;
                    color: white;
                    padding: 0.5rem;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    font-size: 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 1rem;
                    transition:all 0.3s ease-in-out;
                }

                #button1:hover {
                    background-color: grey;
                    opacity: 0.6;
                }
            </style>
  
            <button id="button1">
                <slot></slot>
            </button>
        `;
    }
  }
  customElements.define('button-1', Button1);