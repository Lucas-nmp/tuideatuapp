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
        // Smooth scroll para enlaces con hash
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                const hashIndex = href.indexOf('#');
                
                // Si el enlace contiene un hash
                if (hashIndex !== -1) {
                    const path = href.substring(0, hashIndex);
                    const hash = href.substring(hashIndex);
                    
                    // Si el hash no pertenece a la página actual
                    if (path !== window.location.pathname) {
                        event.preventDefault();
                        
                        // Navegar a la ruta principal primero
                        Turbo.visit(path + hash, { action: "replace" });
                    } else {
                        // Smooth scroll en la misma página
                        event.preventDefault();
                        const target = document.querySelector(hash);
                        if (target) {
                            target.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start' 
                            });
                        }
                    }
                }
            });
        });
    
        // Scroll automático al hash después de cargar la página
        const urlHash = window.location.hash;
        if (urlHash) {
            const target = document.querySelector(urlHash);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                });
            }
        }
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


