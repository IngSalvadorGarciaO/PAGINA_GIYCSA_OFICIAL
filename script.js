document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. ANIMACIÓN DE SECCIONES (Intersection Observer)
    // -------------------------------------------------------------------
    // Se incluye #identidad
    const sections = document.querySelectorAll('.full-screen:not(#inicio)');
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('active');
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('active');
            }
        });
    };

    const observer = new IntersectionObserver(sectionObserverCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // -------------------------------------------------------------------
    // 2. NAVEGACIÓN SUAVE (Smooth Scroll)
    // -------------------------------------------------------------------
    const navMenu = document.querySelector('.navbar nav'); 
    const navLinks = document.querySelectorAll('.navbar nav a'); 

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Cierra el menú en móvil después de hacer clic
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active'); 
                }

                // Asegura la visibilidad del destino para el scroll
                if (targetElement.classList.contains('hidden')) {
                     targetElement.classList.remove('hidden');
                     targetElement.classList.add('active');
                }
            }
        });
    });

    // -------------------------------------------------------------------
    // 3. MENÚ HAMBURGUESA (Mobile Toggle)
    // -------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // -------------------------------------------------------------------
    // 4. LÓGICA DE COTIZACIÓN DE MAQUINARIA
    // -------------------------------------------------------------------
    const contactForm = document.querySelector('.contact-form');
    const machineryCheckboxes = document.querySelectorAll('.machinery-card input[type="checkbox"]');
    const hiddenInput = document.getElementById('maquinaria_solicitada');

    // Función para actualizar el campo oculto antes de enviar
    const updateMachineryList = () => {
        const selectedMachines = [];
        machineryCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedMachines.push(checkbox.value);
            }
        });
        
        if (selectedMachines.length > 0) {
            // Se actualiza el campo oculto con la lista de maquinaria seleccionada
            hiddenInput.value = "Maquinaria solicitada: " + selectedMachines.join(', ');
        } else {
            hiddenInput.value = "No se seleccionó maquinaria.";
        }
    };
    
    // Escucha el evento de envío del formulario para actualizar la lista de maquinaria
    contactForm.addEventListener('submit', updateMachineryList);

    // Escucha el cambio en los checkboxes (opcional pero buena práctica)
    machineryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateMachineryList);
    });

});
