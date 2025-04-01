// NANDA Protocol Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Layer accordion functionality
    const layerHeaders = document.querySelectorAll('.layer-header');
    
    layerHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const layer = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Toggle content visibility
            if (content.style.display === 'none' || !content.style.display) {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                layer.classList.add('active');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                layer.classList.remove('active');
            }
        });
    });
    
    // Initialize the first layer as open
    if (layerHeaders.length > 0) {
        const firstContent = layerHeaders[0].nextElementSibling;
        const firstIcon = layerHeaders[0].querySelector('i');
        
        firstContent.style.display = 'block';
        firstIcon.classList.remove('fa-chevron-down');
        firstIcon.classList.add('fa-chevron-up');
        layerHeaders[0].parentElement.classList.add('active');
    }
    
    // Tab functionality
    const tabHeaders = document.querySelectorAll('.tab-header');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Remove active class from all tabs
            tabHeaders.forEach(h => h.classList.remove('active'));
            
            // Add active class to current tab
            header.classList.add('active');
            
            // Show corresponding tab content
            const tabId = header.getAttribute('data-tab');
            const tabPanes = document.querySelectorAll('.tab-pane');
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add some offset for the sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Code highlighting (placeholder for integration with syntax highlighter)
    const codeBlocks = document.querySelectorAll('pre code');
    if (window.hljs) {
        codeBlocks.forEach(block => {
            hljs.highlightElement(block);
        });
    }
    
    // Add copy button to code blocks
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy to clipboard';
        
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
            });
        });
    });
    
    // Table of contents highlighting based on scroll position
    const tocLinks = document.querySelectorAll('.sidebar a');
    
    if (tocLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSection = '';
            
            document.querySelectorAll('h1[id], h2[id], h3[id]').forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                
                // Adjust this value based on your header height
                if (sectionTop < 100) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Handle mobile sidebar toggle if needed
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
        });
    }
});
