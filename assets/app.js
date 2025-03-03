import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/johndoe.css';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

// Asegurarse de que Turbo esté disponible
if (typeof Turbo !== "undefined") {
    // 1. Smooth Scroll para Navbar (usando Turbo Events)
    document.addEventListener("turbo:load", function() {
        // Delegación de eventos para enlaces dinámicos
        $(document).on("click", ".navbar .nav-link", function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                const hash = this.hash;
                $("html, body").animate(
                    { scrollTop: $(hash).offset().top },
                    700,
                    function() {
                        window.history.replaceState(null, null, hash); // Actualiza la URL sin recargar
                    }
                );
            }
        });
    });

    // 2. Filtros de Portfolio con Isotope
    document.addEventListener("turbo:load", function() {
        var t = $(".portfolio-container");
        t.isotope({
            filter: ".new",
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), $(".filters a").click(function() {
            $(".filters .active").removeClass("active"), $(this).addClass("active");
            var i = $(this).attr("data-filter");
            return t.isotope({
                filter: i,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: !1
                }
            }), !1
        });
    });

    
    
        
}


