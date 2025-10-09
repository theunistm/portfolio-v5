import React, { useEffect, useRef, useState } from 'react';
import type { Media } from './types';

type Props = {
  channelId: string;
};

export default function PhonePreview({ channelId }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const container = document.getElementById(channelId);
    if (!container) return;

    const onShow = (e: Event) => {
      const detail = (e as CustomEvent).detail as Media;
      setIsTransitioning(true);
      setTimeout(() => {
        setMedia(detail);
        setIsTransitioning(false);
      }, 0);
    };
    const onClear = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setMedia(null);
        setIsTransitioning(false);
      }, 0);
    };

    container.addEventListener('flow:show', onShow as EventListener);
    container.addEventListener('flow:clear', onClear as EventListener);
    return () => {
      container.removeEventListener('flow:show', onShow as EventListener);
      container.removeEventListener('flow:clear', onClear as EventListener);
    };
  }, [channelId]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (media?.type === 'video') {
      v.load(); // Reload sources
      v.currentTime = 0;
      
      // Strategy: if preloader warmed assets, attempt immediate play.
      // Otherwise, wait for canplay to avoid blank flashes.
      const playWhenReady = () => {
        const p = v.play();
        if (p && typeof p.then === 'function') p.catch(() => {});
      };

      const preloaded = (window as any).__preloaded === true;
      if (preloaded) {
        playWhenReady();
        // Also ensure playback once data is ready (defensive)
        if (v.readyState < 3) v.addEventListener('canplay', playWhenReady, { once: true });
      } else if (v.readyState >= 3) {
        // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
        playWhenReady();
      } else {
        v.addEventListener('canplay', playWhenReady, { once: true });
      }
    } else {
      try { v.pause(); } catch {}
      v.removeAttribute('src');
      v.load();
    }
  }, [media]);

  return (
    <div className="phone-preview sticky top-[96px] flex flex-col items-center" id={channelId} ref={containerRef}>
      <div className={`iphone-mockup relative mx-auto w-[280px] select-none transition-transform duration-300 ease-out ${media ? 'scale-[1.02]' : 'scale-100'}`}>
        <div className="screen absolute overflow-hidden" style={{ width: 254, height: 545, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', borderRadius: 28 }}>
          {!media && (
            <div 
              className="empty-state w-full h-full bg-white flex items-center justify-center transition-all duration-300"
              style={{ 
                opacity: isTransitioning ? 0 : 1,
                filter: isTransitioning ? 'blur(8px)' : 'blur(0px)'
              }}
            >
              <span className="text-base" style={{ color: '#000000' }}>Hover over a page flow</span>
            </div>
          )}
          {media?.type === 'video' && (
            <video 
              ref={videoRef} 
              className="flow-video w-full h-full object-cover transition-all duration-300" 
              style={{ 
                opacity: isTransitioning ? 0 : 1,
                filter: isTransitioning ? 'blur(8px)' : 'blur(0px)'
              }}
              muted 
              playsInline 
              loop 
              preload="metadata"
              poster={media.src.replace(/\.(webm|mp4)$/, '.jpg')}
            >
              <source src={media.src} type="video/webm" />
              <source src={media.src.replace('.webm', '.mp4')} type="video/mp4" />
            </video>
          )}
          {media?.type === 'image' && (
            <img 
              ref={imgRef} 
              className="flow-image w-full h-full object-cover transition-all duration-300" 
              style={{ 
                opacity: isTransitioning ? 0 : 1,
                filter: isTransitioning ? 'blur(8px)' : 'blur(0px)'
              }}
              src={media.src} 
              alt="App preview" 
            />
          )}
        </div>
        <img src="/images/iphone-frame.png" alt="iPhone frame" className="relative z-10 w-full h-auto pointer-events-none" />
      </div>
    </div>
  );
}
