import { useEffect, useRef } from 'react';
import techStackWorkflow from '../../assets/7b8ec670f643305d755f75159ea0e007717528a6.png';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ isOpen, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ESC key to close modal and focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus trap: keep focus within modal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('keydown', handleTab);

    // Focus the close button when modal opens
    setTimeout(() => {
      const closeButton = modalRef.current?.querySelector('button[aria-label="Close expanded image"]') as HTMLElement;
      closeButton?.focus();
    }, 0);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleTab);
      // Return focus to previously focused element
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded image view"
    >
      <div className="relative max-w-7xl max-h-full">
        <img 
          src={techStackWorkflow} 
          alt="Tech stack workflow diagram - expanded" 
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
          width="1200"
          height="800"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          aria-label="Close expanded image"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

