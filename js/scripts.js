var menu = {
    escargot: {
        src: "images/escargot.jpg",
        price: 1.00,
    },
    salade_verte: {
        src: "images/salade.jpg",
        price: 1.00,
    },
    salade_cesar: {
        src: "images/salade2.jpg",
        price: 1.00,
    },
    spaghetti: {
        src: "images/spaghetti.jpg",
        price: 1.00,
    },
    steak: {
        src: "images/steak.jpg",
        price: 1.00,
    },
    pizza: {
        src: "images/pizza.jpg",
        price: 1.00,
    },
    creme_glacee: {
        src: "images/cremeglacee.jpg",
        price: 1.00,
    },
    pouding: {
        src: "images/pouding.jpg",
        price: 1.00,
    },
    gateau: {
        src: "images/gateau.jpg",
        price: 1.00,
    },
    cafe_the: {
        src: "images/cafe.jpg",
        price: 1.00,
    },
    boisson_gazeuse: {
        src: "images/boisson.jpg",
        price: 1.00,
    },
};

$(document).ready(function () {
    $(".p1-button").on("click", function () {
        var convertionText = $("#p1Input").val();

        if (convertionText === '' || ! $.isNumeric(convertionText)) {
            return;
        }

        switch ($(this).attr('id')) {
            case "poucesCm":
                convertionText = "pouces ==>"    + " " + convertionText * 2.5                       + " " + "cm";
                break;
            case "cmPouces":
                convertionText = "cm ==>"        + " " + convertionText / 2.5                       + " " + "pouces";
                break;
            case "celciusFarenheit":
                convertionText = "celcius ==>"   + " " + convertionText * 9 / 5 + 32                + " " + "farenheit";
                break;
            case "farenheitCelcius":
                convertionText = "farenheit ==>" + " " + ((convertionText - 32) * 5 / 9).toFixed(1) + " " + "celcius";
                break;
            default:
                break;
        }
        
        $('#p1Result').text(convertionText);
    });

    $("#afficherPartieDeux").on("click", function () {
        var niveau        = $("#niveau").val();
        var errorMessage  = "";
        var p2Result      = "";

        if (niveau === "" || ! $.isNumeric(niveau) || niveau < 0 || niveau > 6) {
            errorMessage = "Erreur le niveau doit être entre 1 et 6";
        } else {
            p2Result = "Bonjour" + "" + $('#nom').val() + " " + "niveau=" + niveau;
        }

        $("#p2error").text(errorMessage);
        $("#p2Result").text(p2Result);
    });

    $(".menu-title").on("click", function () {
        $(".menu-title").removeClass("selected");
        $(this).toggleClass("selected");
        $(".options").hide();
        $(this).next(".options").slideToggle({duration: 500});
        $(this).next(".options").children(".menu-item").children(".seperator").addClass("selected");
    });

    $(".menu-item").on("click", function () {
        $(".menu-item").removeClass("selected");
        $(this).addClass("selected");

        var pickedElement = menu[$(this).attr("key")];
        var section = $(this).parent(".options").attr("key");
        $("#section-" + section + " " + "img").attr("src", pickedElement.src);
        $("#section-" + section + " " + ".price").text(pickedElement.price.toFixed(2) + " " + "$");
        $("#section-" + section + " " + ".price").attr("name", $(this).attr("key"));
    });

    $("#calculerFacture").on("click", function () {
        var sum = 0.00;
        $(".price").each(function () {
            if (menu[$(this).attr("name")] === undefined) { return }

            sum += menu[$(this).attr("name")].price;
        });

        var total = sum.toFixed(2);
        var taxes = (sum * (0.05 + 0.09975)).toFixed(2)

        $("#total").text(total);
        $("#taxes").text(taxes)
        $("#grand-total").text((parseFloat(total) + parseFloat(taxes)).toFixed(2));
        $("#receipt-section").show();
    });
});