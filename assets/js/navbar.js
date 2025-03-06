document.addEventListener('turbo:load', () => {
    const navButton = document.querySelector("#main-navbar .nav-button");

    if (navButton) {
        
        navButton.addEventListener("click", function(event){
            
            event.stopPropagation();

            
            this.nextElementSibling.classList.toggle("show");
        });

        
        document.addEventListener("click", function(){
            navButton.nextElementSibling.classList.remove("show");
        });
    }
});