document.addEventListener('DOMContentLoaded', function() {
    
    // --- Menu Mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            // Muda o ícone de hamburguer para X
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('#nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Header Scrolled Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Botão Voltar ao Topo
        const backToTopBtn = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // --- Botão Voltar ao Topo ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Scroll Suave para Links Internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Validação do Formulário de Contato ---
    const formContato = document.getElementById('form-contato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtém os valores
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validação simples
            if (nome === '' || email === '' || telefone === '') {
                alert('Por favor, preencha todos os campos obrigatórios (*).');
                return;
            }
            
            // Validação de e-mail básica
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de envio (aqui você integraria com um backend ou API de e-mail)
            // Exemplo: usar a API do WhatsApp ou um serviço como Formspree.
            
            // Como não há backend, vamos simular o envio e redirecionar para o WhatsApp
            const mensagemWhatsApp = `Olá! Meu nome é ${nome}.%0AEmail: ${email}%0ATelefone: ${telefone}%0AServiço de interesse: ${servico || 'Não especificado'}%0AMensagem: ${mensagem}`;
            const numeroWhatsApp = '551127427971'; // Número do WhatsApp da empresa
            
            // Abre o WhatsApp com a mensagem pré-formatada
            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`, '_blank');
            
            // Limpa o formulário
            formContato.reset();
            
            // Mensagem de sucesso
            alert('Mensagem enviada com sucesso! Redirecionando para o WhatsApp...');
        });
    }

    // --- Animação de Entrada (Scroll Reveal Simples) ---
    // Esta é uma implementação básica. Para produção, considere usar a biblioteca AOS.
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplica a animação a elementos específicos
    const animatedElements = document.querySelectorAll('.servico-card, .mvv-card, .stat-item, .sobre-texto, .contato-info, .contato-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // --- Ano Atual no Footer (Opcional) ---
    // Descomente se quiser que o ano no footer seja dinâmico
    // const currentYear = new Date().getFullYear();
    // const footerYear = document.querySelector('footer p:first-of-type');
    // if (footerYear) {
    //     footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    // }
});
