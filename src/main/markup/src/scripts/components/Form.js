
var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');

var SUCCESS_CLASS = "has-success";
var ERROR_CLASS = "has-error";
var ERROR_MESSAGE_CLASS = "input-error";
var TOP_MESSAGE_CLASS = 'top-message';
var DELETE_BUTTON_CLASS = 'js-delete';
var ELEM_CLASS = 'js-list-elem';
var DELETE_CLASS = 'deleting';
var SAVE_BUTTON = "js-save";

function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if( name ) {
            obj[ name ] = value;
        }
    }

    return JSON.stringify( obj );
}


function FormConstructor(form)
{
    this.__form = form;
    this.__inputs = form.querySelectorAll("input, select, textarea");
    this.__errors = {};
    this.__showMessage = form.getAttribute("data-show-messages")==="false" ? false : true;
    this.__showTop = form.getAttribute("data-show-top")==="false" ? false : true;
    this.__deleteButton = form.querySelector("." + DELETE_BUTTON_CLASS);
    this.__saveButton = form.querySelector("." + SAVE_BUTTON);
    this._initEventable();

    this.__form.addEventListener("submit", this);
    if (this.__deleteButton) {
        this.__deleteButton.addEventListener("click", this);
    }
    
}

extendConstructor(FormConstructor, Eventable);
var FormConstructorPrototype = FormConstructor.prototype;


FormConstructorPrototype.removeError = function (input) {
  input.classList.remove(SUCCESS_CLASS);
  input.classList.remove(ERROR_CLASS);
  if (Object.keys(this.__errors).length === 0)
  {
      this.__saveButton.classList.remove("disable-button");
  }
  if (this.__showMessage)
  {
      var errBlock = input.parentElement.querySelector('.' + ERROR_MESSAGE_CLASS);
      if (errBlock) {
          errBlock.remove();
      }
  }
};

FormConstructorPrototype.showError = function (input, error) {

    this.removeError(input);

    if (error)
    {
        this.__saveButton.classList.add("disable-button");
        input.classList.add(ERROR_CLASS);
        if (this.__showMessage) {
            var block = document.createElement("span");
            block.classList.add(ERROR_MESSAGE_CLASS);
            block.innerText = error;
            input.parentElement.appendChild(block);
        }
    } else
    {
        input.classList.add(SUCCESS_CLASS);
    }
    return error;
};

FormConstructorPrototype.hideMessage = function (messBlock) {
    messBlock.remove();
}

FormConstructorPrototype.formSubmit = function (event) {
    this.__errors = validate(this.__form, this.__constraings);
    if (!this.__errors)
        this.__errors = {};
    if (!this.__showTop) {
        for (var i = 0; i < this.__inputs.length; i++) {
            this.showError(this.__inputs.item(i), this.__errors[this.__inputs.item(i).name]);
        }
    }
    if (Object.keys(this.__errors).length > 0)
    {
        event.preventDefault();
    } else if (this.__showTop)
    {

        event.preventDefault();
        var request = new XMLHttpRequest();
        var obj = this;
        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                if(request.status !== 200) {
                    console.log(request.responseText);
                    alert('Something bad, try later');
                    window.location.reload();
                } else {
                        for (var i=0;i<obj.__inputs.length;i++)
                            obj.removeError(obj.__inputs.item(i));
                        var messBlock = document.createElement("div");
                        messBlock.innerText = "SUCCESS SAVED!";
                        var parent = document.getElementsByTagName("body").item(0);
                        var first = parent.firstChild;
                        messBlock.classList.add(TOP_MESSAGE_CLASS);
                        parent.insertBefore(messBlock, first);
                        setTimeout(obj.hideMessage, 3000, messBlock);
                }
            }
        };
        request.open('put', '/list',true);
        request.setRequestHeader( 'Content-Type', 'application/json' );
        request.send(toJSONString(this.__form));
    }
};


FormConstructorPrototype.inputChanging = function (input) {
    this.__errors = validate(this.__form, this.__constraings);
    if (!this.__errors)
        this.__errors = {};
    this.showError(input, this.__errors[input.name]);

};

FormConstructorPrototype.setValidating = function (constraints) {
    this.__constraings = constraints;
    for (var i=0;i<this.__inputs.length; i++)
    {
        this.__inputs.item(i).addEventListener("change", this);
    }
};


function removeElem() {
    this.remove();
}

FormConstructorPrototype.deleteElement = function () {
    var elem = this.__form.closest("." + ELEM_CLASS);
    elem.classList.add(DELETE_CLASS);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState === 4) {
            if(request.status !== 200) {
                alert('Something bad, try later');
                window.location.reload();
            }
        }
    };
    request.open('delete', '/list',true);
    request.setRequestHeader( 'Content-Type', 'application/json' );
    request.send(toJSONString(this.__form));
    elem.addEventListener('transitionend',removeElem, false);
}

FormConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'change':
            this.inputChanging(e.target);
            break;
        case 'submit':
                this.formSubmit(e);
            break;
        case 'click':
            this.deleteElement();
            break;
    }
};

module.exports = FormConstructor;