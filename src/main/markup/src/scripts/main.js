document.addEventListener('DOMContentLoaded', function() {
    var constraints = {
        email: {
            presence: true,
            email: true,
        },
        name: {
            presence: true,
            length: {
                maximum: 30
            },
            format: {
                pattern: "[a-zА-Я \-]+",
                message: "can only contain a-z,а-я,- and space",
                flags: "i",
            }
        },
    };

var Form = require("./components/Form.js");
    var forms = document.getElementsByClassName("js-validating");
    var formsArr = [];
    for (var i=0;i<forms.length;i++) {
        var obj = new Form(forms.item(i));
        obj.setValidating(constraints);
        formsArr.push(obj);
    }

});