import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    // Function to open modal when the button is clicked
    const handleOpenModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest(`[data-modal-target="${id}"]`);
      
      if (button) {
        e.preventDefault();
        previouslyFocused.current = document.activeElement;
        // Save scroll position before opening
        scrollPosition.current = window.scrollY;
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
      // Lock body scroll and add modal-open class for blur effect
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.classList.add('modal-open');
      
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
      // Restore scroll and remove modal-open class when modal closes
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('modal-open');
      
      // Restore scroll position
      window.scrollTo(0, scrollPosition.current);
      
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

  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-end p-5"
      role="presentation"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Backdrop - background blur already handled by parent */}
      <div 
        className="absolute inset-0" 
        onClick={closeModal}
        aria-hidden="true"
      />
      
      {/* Modal panel sliding from right */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-[560px] h-[calc(100vh-40px)] overflow-y-auto border"
        style={{ 
          borderColor: projectColor,
          borderWidth: '1px',
          fontFamily: "'PP Mondwest', serif"
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button - top left */}
        <div className="sticky top-0 left-0 p-5 pb-0 z-10">
          <button 
            ref={closeButtonRef}
            aria-label="Close case study"
            className="fixed top-8 right-8 z-50 w-8 h-8 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            onClick={closeModal}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_467_1213)">
                <path d="M19.8096 32H12.1904V30.4697H19.8096V32Z" fill={projectColor}/>
                <path d="M12.1904 30.4697H9.13965V28.9502H12.1904V30.4697Z" fill={projectColor}/>
                <path d="M22.8604 30.4697H19.8096L19.8105 28.9502H22.8604V30.4697Z" fill={projectColor}/>
                <path d="M9.13965 28.9502H6.09961V27.4199H9.13965V28.9502Z" fill={projectColor}/>
                <path d="M25.9102 28.9502H22.8604V27.4199H25.9102V28.9502Z" fill={projectColor}/>
                <path d="M6.09961 27.4199H4.57031V25.9004H6.09961V27.4199Z" fill={projectColor}/>
                <path d="M27.4297 27.4199H25.9102V25.9004H27.4297V27.4199Z" fill={projectColor}/>
                <path d="M4.57031 25.9004H3.0498V22.8496H4.57031V25.9004Z" fill={projectColor}/>
                <path d="M28.9502 25.9004H27.4297V22.8496H28.9502V25.9004Z" fill={projectColor}/>
                <path d="M10 24.4004H7.59961V22H10V24.4004Z" fill={projectColor}/>
                <path d="M24.4004 24.4004H22V22H24.4004V24.4004Z" fill={projectColor}/>
                <path d="M3.0498 22.8496H1.53027V19.8096H3.0498V22.8496Z" fill={projectColor}/>
                <path d="M30.4795 22.8496H28.9502V19.8096H30.4795V22.8496Z" fill={projectColor}/>
                <path d="M12.4004 22H10V19.5996H12.4004V22Z" fill={projectColor}/>
                <path d="M22 22H19.5996V19.5996H22V22Z" fill={projectColor}/>
                <path d="M1.53027 19.8096H0V12.1904H1.53027V19.8096Z" fill={projectColor}/>
                <path d="M32 19.8096H30.4795L30.4805 12.1904H32V19.8096Z" fill={projectColor}/>
                <path d="M14.7998 19.5996H12.4004V17.2002H14.7998V19.5996Z" fill={projectColor}/>
                <path d="M19.5996 19.5996H17.2002V17.2002H19.5996V19.5996Z" fill={projectColor}/>
                <path d="M17.2002 17.2002H14.7998V14.7998H17.2002V17.2002Z" fill={projectColor}/>
                <path d="M14.7998 14.7998H12.4004V12.4004H14.7998V14.7998Z" fill={projectColor}/>
                <path d="M19.5996 14.7998H17.2002V12.4004H19.5996V14.7998Z" fill={projectColor}/>
                <path d="M12.4004 12.4004H10V10H12.4004V12.4004Z" fill={projectColor}/>
                <path d="M22 12.4004H19.5996V10H22V12.4004Z" fill={projectColor}/>
                <path d="M3.0498 12.1904H1.53027V9.13965H3.0498V12.1904Z" fill={projectColor}/>
                <path d="M30.4805 12.1904H28.9502V9.13965H30.4805V12.1904Z" fill={projectColor}/>
                <path d="M10 10H7.59961V7.59961H10V10Z" fill={projectColor}/>
                <path d="M24.4004 10H22V7.59961H24.4004V10Z" fill={projectColor}/>
                <path d="M4.57031 9.13965H3.0498V6.08984H4.57031V9.13965Z" fill={projectColor}/>
                <path d="M28.9502 9.13965H27.4297V6.08984H28.9502V9.13965Z" fill={projectColor}/>
                <path d="M6.09961 6.08984H4.57031V4.57031H6.09961V6.08984Z" fill={projectColor}/>
                <path d="M27.4297 6.08984H25.9102V4.57031H27.4297V6.08984Z" fill={projectColor}/>
                <path d="M9.13965 4.57031H6.09961V3.04004H9.13965V4.57031Z" fill={projectColor}/>
                <path d="M25.9102 4.57031H22.8604V3.04004H25.9102V4.57031Z" fill={projectColor}/>
                <path d="M12.1904 3.04004H9.13965V1.51953H12.1904V3.04004Z" fill={projectColor}/>
                <path d="M22.8604 3.04004H19.8105V1.51953H22.8604V3.04004Z" fill={projectColor}/>
                <path d="M19.8105 1.51953H12.1904V0H19.8096L19.8105 1.51953Z" fill={projectColor}/>
              </g>
              <defs>
                <clipPath id="clip0_467_1213">
                  <rect width="32" height="32" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="p-5">
          {/* Project title - H2 */}
          <h2 
            id={`modal-title-${id}`}
            className="text-[2rem] leading-tight font-normal mb-8"
            style={{ 
              color: projectColor,
              fontFamily: "'PP Mondwest', serif"
            }}
          >
            {title}
          </h2>
          
          {/* Case study sections */}
          <div 
            className="case-study-content"
            style={{ color: projectColor }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      
      <style>{`
        /* H5 for all copy (subheadings and paragraphs) */
        .case-study-content h2,
        .case-study-content h3,
        .case-study-content h4,
        .case-study-content h5,
        .case-study-content h6 {
          font-size: 1.125rem;
          line-height: 1.6;
          font-weight: bold;
          text-decoration: underline;
          margin-bottom: 0.5rem;
          margin-top: 40px;
          font-family: 'PP Mondwest', serif;
        }
        
        /* Remove top margin from the first heading */
        .case-study-content h2:first-child,
        .case-study-content h3:first-child,
        .case-study-content h4:first-child,
        .case-study-content h5:first-child,
        .case-study-content h6:first-child {
          margin-top: 0;
        }
        
        .case-study-content p,
        .case-study-content li {
          font-size: 1.125rem;
          line-height: 1.6;
          font-weight: normal;
          margin-bottom: 0.5rem;
          font-family: 'PP Mondwest', serif;
        }
        
        .case-study-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.5rem;
        }
        
        .case-study-content li {
          padding-left: 0;
        }
      `}</style>
    </div>
  );

  // Render modal using portal to document.body to avoid blur effect
  return createPortal(modalContent, document.body);
}
