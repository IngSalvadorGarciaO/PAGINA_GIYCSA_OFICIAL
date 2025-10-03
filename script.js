document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todas las secciones de pantalla completa, excepto la primera (inicio)
    const sections = document.querySelectorAll('.full-screen:not(#inicio)');
    // La sección que siempre está visible al cargar
    const initialSection = document.getElementById('inicio');
    // La primera sección que debe aparecer al hacer scroll (justo después del inicio)
    const firstSectionToObserve = sections[0]; 
    
    // Objeto de opciones para el Intersection Observer
    const observerOptions = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% de la sección es visible
    };

    /**
     * Callback que se ejecuta cuando la visibilidad de un elemento cambia
     */
    const sectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección es visible (al hacer scroll hacia abajo o hacia arriba)
                entry.target.classList.remove('hidden');
                entry.target.classList.add('active');
            } else {
                 // Si la sección ya no está en el viewport
                entry.target.classList.add('hidden');
                entry.target.classList.remove('active');
            }
        });
    };

    // Crea el observador
    const observer = new IntersectionObserver(sectionObserverCallback, observerOptions);

    // Observa todas las secciones (excepto inicio) para activar la animación de entrada
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Configuración para el efecto de navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Lógica de scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
});
                
                // Asegura que la sección de destino se muestre si el scroll no lo hace inmediatamente
                // (útil para el menú de navegación)
                if (targetElement.classList.contains('hidden')) {
                     targetElement.classList.remove('hidden');
                     targetElement.classList.add('active');
                }
            }

        });

    });


});
