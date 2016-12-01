/**
 * Created by ivan on 30/11/16.
 */

$("document").ready(function() {

    var currentPage = 1;
    var templateData = null;

    function getData() {
        $.getJSON('plantillaData.json', function (data) {
           templateData = data;
           renderTemplate(templateData, currentPage);
        });
    }

    function renderTemplate(data, pageNumber) {
        $('#contactos').loadTemplate('./plantillas/contactos.html', data["empleados"],
            {   paged: true,
                pageNo: pageNumber,
                elemPerPage: 1
            });
        $('#contactos').loadTemplate('./plantillas/contactos.html', {
                "nombre": "Laura Hernandez",
            },
            {   append: true,
                beforeInsert: onBefore,
                afterInsert: onAfter,
                complete: onComplete
            });
    }

    $.addTemplateFormatter("EmailLink",
        function (value, options) {
            return "mailto:" + value;
        });

    document.querySelector("#prevPage").addEventListener("click", function () {
        if (currentPage > 1) {
            renderTemplate(templateData, --currentPage);
        }
    }, false);

    document.querySelector("#nextPage").addEventListener("click", function () {
        if (currentPage < 4) {
            renderTemplate(templateData, ++currentPage);
        }
    }, false);

    getData();

    function onBefore(data) {
        console.log("el contenido esta por ingresar: " + data);
    }
    function onAfter(data) {
        console.log("el contenido fue ingresado: " + data);
    }

    function onComplete(data) {
        console.log("se completo la operacion");
    }

});

