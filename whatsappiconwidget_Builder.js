(function () {
        let template = document.createElement("template");
        template.innerHTML = `
        <br>
    <style>
        #form {
            font-family: Arial, sans-serif;
            width: 400px;
            margin: 0 auto;
        }

        a {
            text-decoration: none;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        td {
            padding: 1px;
            text-align: left;
            font-size: 13px;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 13px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }

        input[type="color"] {
            -webkit-appearance: none;
            border: none;
            width: 32px;
            height: 32px;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        input[type="color"]::-webkit-color-swatch {
            border: none;
        }

        select {
            width: 100%;
            padding: 10px;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 13px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }

        input[type="submit"] {
            background-color: #487cac;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            width: 100%;
        }

        #label {
            width: 140px;
        }
    </style>
    <form id="form">
        <table>
            <tr>
                <td>
                    <p>Phone Number (without +)</p>
                    <input id="builder_number" type="number" placeholder="Enter Phone Number (without +)">
                </td>
            </tr>
            <tr>
                <td>
                    <p>URL of Report/Story</p>
                    <input id="builder_url" type="text" placeholder="Enter the URL of the story or report">
                </td>
            </tr>
            <tr>
                <td>
                    <p>Caption</p>
                    <input id="builder_caption" type="text" placeholder="Enter Caption">
                </td>
            </tr>
        </table>
        <input value="Update Settings" type="submit">
        <br>
   
    </form>
        `;
        class whatsappiconwidgetWidgetBuilderPanel extends HTMLElement {
           constructor() {
              super();
              this._shadowRoot = this.attachShadow({
                 mode: "open"
              });
              this._shadowRoot.appendChild(template.content.cloneNode(true));
              this._shadowRoot
                 .getElementById("form")
                 .addEventListener("submit", this._submit.bind(this));
           }
           _submit(e) {
                 e.preventDefault();
                 this.dispatchEvent(
                    new CustomEvent("propertiesChanged", {
                       detail: {
                          properties: {
                           number: this.number,
                           url: this.url,
                           caption: this.caption
                          },
                       },
                    })
                 );
            }
            set number(_number) {
               this._shadowRoot.getElementById("builder_number").value = _number;
           }
           get number() {
            return this._shadowRoot.getElementById("builder_number").value;
        }

        set url(_url) {
            this._shadowRoot.getElementById("builder_url").value = _url;
        }

        get url() {
            return this._shadowRoot.getElementById("builder_url").value;
        }

        set caption(_caption) {
            this._shadowRoot.getElementById("builder_caption").value = _caption;
        }

        get caption() {
            return this._shadowRoot.getElementById("builder_caption").value;
        }
            
      
      }
     customElements.define("com-indirasai-sap-whatsappiconwidget-builder", 
     whatsappiconwidgetWidgetBuilderPanel
     );
  })();