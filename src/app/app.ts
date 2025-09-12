import { Component, signal, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Marc Sendra Portfolio');
  protected isMobileMenuOpen = signal(false);

  ngOnInit() {
    // Initialization logic if needed
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // Cerrar menú al redimensionar ventana
  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  // Cerrar menú al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      const isClickInsideNav = navToggle.contains(target) || navMenu.contains(target);
      
      if (!isClickInsideNav && this.isMobileMenuOpen()) {
        this.closeMobileMenu();
      }
    }
  }
}
