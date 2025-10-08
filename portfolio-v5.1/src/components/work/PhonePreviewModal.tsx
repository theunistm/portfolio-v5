import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Media } from './types';

interface PhonePreviewModalProps {
  channelId: string;
}

export default function PhonePreviewModal({ channelId }: PhonePreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [media, setMedia] = useState<Media | null>(null);
  const [flowName, setFlowName] = useState<string>('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById(channelId);
    if (!container) return;

    // Listen for mobile preview open events
    const onOpenPreview = (e: Event) => {
      const detail = (e as CustomEvent).detail as { media: Media; flowName: string };
      
      // Store previously focused element
      previouslyFocused.current = document.activeElement as HTMLElement;
      
      setMedia(detail.media);
      setFlowName(detail.flowName);
      setIsOpen(true);
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      
      // Trigger animation after mount
      setTimeout(() => setIsAnimating(true), 10);
    };

    container.addEventListener('flow:openMobilePreview', onOpenPreview as EventListener);
    return () => {
      container.removeEventListener('flow:openMobilePreview', onOpenPreview as EventListener);
    };
  }, [channelId]);

  // Handle video playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    if (isOpen && media?.type === 'video') {
      v.load(); // Reload sources
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
    } else if (!isOpen && v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
    }
  }, [isOpen, media]);

  // Close modal
  const closeModal = () => {
    setIsAnimating(false);
    
    // Pause video if playing
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {}
    }
    
    // Unlock scroll
    document.body.style.overflow = '';
    
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setIsOpen(false);
      // Restore focus
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
      }
    }, 260);
  };

  // Keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    // Focus trap
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('keydown', handleTabKey);

    // Focus close button after animation
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-preview-title"
    >
      {/* Backdrop with blur - keeps content visible */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Phone mockup container */}
      <div
        ref={modalRef}
        className={`relative z-10 transition-all duration-[240ms] ease-out ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-0'
        }`}
        style={{
          maxWidth: 'min(92vw, 320px)',
          maxHeight: '80vh'
        }}
      >
        <h2 id="mobile-preview-title" className="sr-only">{flowName} Preview</h2>
        
        {/* iPhone mockup - using exact desktop dimensions */}
        <div className="iphone-mockup relative mx-auto w-[280px] select-none">
          <div 
            className="screen absolute overflow-hidden" 
            style={{ 
              width: 254, 
              height: 545, 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)', 
              borderRadius: 28 
            }}
          >
            {media?.type === 'video' && (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                preload="metadata"
              >
                <source src={media.src} type="video/webm" />
                <source src={media.src.replace('.webm', '.mp4')} type="video/mp4" />
              </video>
            )}
            {media?.type === 'image' && (
              <img
                className="w-full h-full object-cover"
                src={media.src}
                alt={`${flowName} preview`}
              />
            )}
          </div>
          <img 
            src="/images/iphone-frame.png" 
            alt="" 
            className="relative z-10 w-full h-auto pointer-events-none" 
          />
        </div>

        {/* Close button below phone - 40px gap */}
        <div className="flex justify-center mt-10">
          <button
            ref={closeButtonRef}
            onClick={closeModal}
            className="min-w-[44px] min-h-[44px] w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg hover:bg-white active:bg-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close preview"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.8096 32H12.1904V30.4697H19.8096V32Z" fill="#500F0B"/>
              <path d="M12.1904 30.4697H9.13965V28.9502H12.1904V30.4697Z" fill="#500F0B"/>
              <path d="M22.8604 30.4697H19.8096L19.8105 28.9502H22.8604V30.4697Z" fill="#500F0B"/>
              <path d="M9.13965 28.9502H6.09961V27.4199H9.13965V28.9502Z" fill="#500F0B"/>
              <path d="M25.9102 28.9502H22.8604V27.4199H25.9102V28.9502Z" fill="#500F0B"/>
              <path d="M6.09961 27.4199H4.57031V25.9004H6.09961V27.4199Z" fill="#500F0B"/>
              <path d="M27.4297 27.4199H25.9102V25.9004H27.4297V27.4199Z" fill="#500F0B"/>
              <path d="M4.57031 25.9004H3.0498V22.8496H4.57031V25.9004Z" fill="#500F0B"/>
              <path d="M28.9502 25.9004H27.4297V22.8496H28.9502V25.9004Z" fill="#500F0B"/>
              <path d="M10 24.4004H7.59961V22H10V24.4004Z" fill="#500F0B"/>
              <path d="M24.4004 24.4004H22V22H24.4004V24.4004Z" fill="#500F0B"/>
              <path d="M3.0498 22.8496H1.53027V19.8096H3.0498V22.8496Z" fill="#500F0B"/>
              <path d="M30.4795 22.8496H28.9502V19.8096H30.4795V22.8496Z" fill="#500F0B"/>
              <path d="M12.4004 22H10V19.5996H12.4004V22Z" fill="#500F0B"/>
              <path d="M22 22H19.5996V19.5996H22V22Z" fill="#500F0B"/>
              <path d="M1.53027 19.8096H0V12.1904H1.53027V19.8096Z" fill="#500F0B"/>
              <path d="M32 19.8096H30.4795L30.4805 12.1904H32V19.8096Z" fill="#500F0B"/>
              <path d="M14.7998 19.5996H12.4004V17.2002H14.7998V19.5996Z" fill="#500F0B"/>
              <path d="M19.5996 19.5996H17.2002V17.2002H19.5996V19.5996Z" fill="#500F0B"/>
              <path d="M17.2002 17.2002H14.7998V14.7998H17.2002V17.2002Z" fill="#500F0B"/>
              <path d="M14.7998 14.7998H12.4004V12.4004H14.7998V14.7998Z" fill="#500F0B"/>
              <path d="M19.5996 14.7998H17.2002V12.4004H19.5996V14.7998Z" fill="#500F0B"/>
              <path d="M12.4004 12.4004H10V10H12.4004V12.4004Z" fill="#500F0B"/>
              <path d="M22 12.4004H19.5996V10H22V12.4004Z" fill="#500F0B"/>
              <path d="M3.0498 12.1904H1.53027V9.13965H3.0498V12.1904Z" fill="#500F0B"/>
              <path d="M30.4805 12.1904H28.9502V9.13965H30.4805V12.1904Z" fill="#500F0B"/>
              <path d="M10 10H7.59961V7.59961H10V10Z" fill="#500F0B"/>
              <path d="M24.4004 10H22V7.59961H24.4004V10Z" fill="#500F0B"/>
              <path d="M4.57031 9.13965H3.0498V6.08984H4.57031V9.13965Z" fill="#500F0B"/>
              <path d="M28.9502 9.13965H27.4297V6.08984H28.9502V9.13965Z" fill="#500F0B"/>
              <path d="M6.09961 6.08984H4.57031V4.57031H6.09961V6.08984Z" fill="#500F0B"/>
              <path d="M27.4297 6.08984H25.9102V4.57031H27.4297V6.08984Z" fill="#500F0B"/>
              <path d="M9.13965 4.57031H6.09961V3.04004H9.13965V4.57031Z" fill="#500F0B"/>
              <path d="M25.9102 4.57031H22.8604V3.04004H25.9102V4.57031Z" fill="#500F0B"/>
              <path d="M12.1904 3.04004H9.13965V1.51953H12.1904V3.04004Z" fill="#500F0B"/>
              <path d="M22.8604 3.04004H19.8105V1.51953H22.8604V3.04004Z" fill="#500F0B"/>
              <path d="M19.8105 1.51953H12.1904V0H19.8096L19.8105 1.51953Z" fill="#500F0B"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
