import React, { useState, useEffect, useRef } from 'react';

interface CaseStudyModalProps {
  id: string;
  title: string;
  content: string;
  projectColor: string;
}

export default function CaseStudyModal({ 
  id, 
  title, 
  content,
  projectColor
}: CaseStudyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Track previously focused element to restore focus when modal closes
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    // Function to open modal when the button is clicked
    const handleOpenModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest(`[data-modal-target="${id}"]`);
      
      if (button) {
        e.preventDefault();
        previouslyFocused.current = document.activeElement;
        setIsOpen(true);
      }
    };

    // Close modal on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    
    // Close modal when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen && 
        modalRef.current && 
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };

    // Add event listeners
    document.addEventListener('click', handleOpenModal);
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleOpenModal);
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, isOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();

      // Set up focus trap
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !modalRef.current) return;

        // Get all focusable elements in modal
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        // Create focus trap
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    } else {
      // Restore scroll when modal closes
      document.body.style.overflow = '';
      
      // Restore focus when modal closes
      if (previouslyFocused.current) {
        (previouslyFocused.current as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/40 backdrop-blur-sm overflow-y-auto"
      role="presentation"
    >
      <div
        ref={modalRef}
        className="bg-[#FBF9F5] rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-[#EAE2DE]"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${id}`}
      >
        <div className="modal-content p-6">
          {/* Header with close button */}
          <div className="modal-header flex justify-between items-center mb-6">
            <h2 
              id={`modal-title-${id}`}
              className="text-xl font-medium"
              style={{ color: projectColor }}
            >
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              className="text-[#500F0B]/70 hover:text-[#500F0B] rounded-full p-1 transition-colors focus:outline-none focus-visible:ring-2"
              style={{ '--ring-color': projectColor } as React.CSSProperties}
              aria-label="Close modal"
              onClick={closeModal}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Modal content */}
          <div 
            className="modal-body prose prose-sm max-w-none prose-headings:text-[#500F0B] prose-headings:font-normal prose-p:text-[#500F0B] prose-a:text-[color:var(--project)] prose-a:no-underline hover:prose-a:underline"
            style={{ ['--project' as string]: projectColor }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
