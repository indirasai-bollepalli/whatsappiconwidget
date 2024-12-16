
  (function() {
      let template = document.createElement("template");
      template.innerHTML = `
       <style>
      :host {
        display: inline-block;
        background-color: #25D366;
        border-radius: 50px;
        color: #FFF;
        cursor: pointer;
        font-weight: bold;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
      }

      #caption {
        position: relative;
        margin-top: 0px;
      }
    </style>
    <div>
      <!-- Custom WhatsApp icon -->
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" width="30"/> <!-- Replace with your custom icon URL -->
      <span id="caption"></span>
    </div>
      `;
      class whatsappiconwidgetWidget extends HTMLElement {
          constructor() {
              super();
              let shadowRoot = this.attachShadow({
                  mode: "open"
              });
              shadowRoot.appendChild(template.content.cloneNode(true));
              this._props = {};
          }
          async connectedCallback() {
              this.initMain();
          }
          async initMain() {
            let number = this._props.number; // use default value if number prop is not set
            let urllink = this._props.urllink; // use default URL if not set
            let caption = this._props.caption; // use default caption if not set
            
            // Update widget content with the caption
            this.shadowRoot.querySelector("#caption").textContent = caption;
            
          }
          onCustomWidgetBeforeUpdate(changedProperties) {
              this._props = {
                  ...this._props,
                  ...changedProperties
              };
          }
          onCustomWidgetAfterUpdate(changedProperties) {
              this.initMain();
          }
          async onClick() {
            let url = `https://api.whatsapp.com/send?phone=${this._props.number}&text=${encodeURIComponent(this._props.urllink)}`;
            window.open(url, "_blank");
          }
      }
      customElements.define("com-indirasai-sap-whatsappiconwidget", whatsappiconwidgetWidget);
  })();