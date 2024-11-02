//Accordion
class Accordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
      ul { list-style-type: none; }
      
      .accordion {
        width:100%;
      }
      
      .accordion .link {
        z-index:4;
        cursor: pointer;
        padding: 15px 15px 15px 42px;
        color: white;
        font-family: "Morn", sans-serif;
        font-size: 1.5rem;
        border-bottom: 1px solid #CCC;
        position: relative;
        transition: all 0.4s ease;
      }
      
      .accordion li i { 
        z-index: 2;
        font-size: 1.5rem;
        font-family: "Morn", sans-serif;
        color: white;
        transition: all 0.4s ease;
      }
      
      .submenu {
        font-family: "Morn", sans-serif;
        transition: max-height 0.8s ease, opacity 0.8s ease;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        color: white;
      }
      
      .submenu.open {
        display: block;
        max-height: 500px;
        opacity: 1;
        color: white;
      }
      
      .submenu a {
        display: block;
        text-decoration: none;
        color: white;
        padding-top: 12px;
        padding-bottom: 12px;
        transition: all 0.25s ease;
      }
      </style>
      <ul id="accordion" class="accordion"></ul>
    `;
  }
  
  connectedCallback() { 
    const accordionItems = this.querySelectorAll("accordion-item");
    
    accordionItems.forEach(item => {
      const title = item.getAttribute("title");
      const content = item.innerHTML;
      this.shadowRoot.querySelector("#accordion").innerHTML += `
        <li>
          <div class="link">${title}</div>
          <ul class="submenu">
            <li>${content}</li>
          </ul>
        </li>
      `;
    });
    
    const links = this.shadowRoot.querySelectorAll(".link");
    links.forEach(link => {
      link.addEventListener("click", event => {
        const content = event.currentTarget.nextElementSibling;
        let openAccordionItems = this.shadowRoot.querySelectorAll(".link");
        content.classList.toggle("open");
        openAccordionItems.forEach(item => {
          if (item !== event.target) {
              item.nextElementSibling.classList.remove("open");
            }
          });
        });
      });
        
  
    }
  }
  
  customElements.define("accordion-menu", Accordion);