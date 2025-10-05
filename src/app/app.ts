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
  
  // Modal de imagen
  protected isImageModalOpen = signal(false);
  protected modalImageSrc = signal('');
  protected modalImageAlt = signal('');

  ngOnInit() {
    // Initialization logic if needed
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // Funciones del modal de imagen
  openImageModal(imageSrc: string, imageAlt: string = 'Imagen del proyecto') {
    this.modalImageSrc.set(imageSrc);
    this.modalImageAlt.set(imageAlt);
    this.isImageModalOpen.set(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }

  closeImageModal() {
    this.isImageModalOpen.set(false);
    this.modalImageSrc.set('');
    this.modalImageAlt.set('');
    document.body.style.overflow = 'auto'; // Restaurar scroll
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

  // Cerrar modal con tecla Escape
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isImageModalOpen()) {
      this.closeImageModal();
    }
  }
}
