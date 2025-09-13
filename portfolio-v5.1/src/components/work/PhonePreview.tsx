import React, { useState, useEffect, useRef } from 'react';
import type { Flow } from './types';

interface PhonePreviewProps {
  flows: Flow[];
}

export default function PhonePreview({ flows }: PhonePreviewProps) {
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  // Listen for flow selection changes
  useEffect(() => {
    const handleFlowChange = (event: CustomEvent<{ flowIndex: number }>) => {
      setActiveFlowIndex(event.detail.flowIndex);
      
      // Play video if it's a video and currently visible
      const activeFlow = flows[event.detail.flowIndex];
      if (activeFlow?.media.type === 'video') {
        const videoRef = videoRefs.current[event.detail.flowIndex];
        if (videoRef) {
          videoRef.currentTime = 0; // Reset to beginning
          videoRef.play().catch(err => console.error('Error playing video:', err));
        }
      }
    };

    // TypeScript requires this cast for CustomEvent
    window.addEventListener('updatePhonePreview', handleFlowChange as EventListener);
    
    return () => {
      window.removeEventListener('updatePhonePreview', handleFlowChange as EventListener);
    };
  }, [flows]);

  // Get current flow
  const activeFlow = flows[activeFlowIndex];
  
  if (!activeFlow) return null;

  return (
    <div className="phone-preview sticky top-[96px] flex flex-col items-center">
      <div className="phone-frame relative mx-auto w-[240px] h-[480px] bg-white rounded-[32px] border-[8px] border-[#1A1A1A] shadow-md overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80px] h-[20px] bg-[#1A1A1A] rounded-b-[8px] z-10"></div>
        
        {/* Media Container */}
        <div className="media-container h-full w-full overflow-hidden bg-white">
          {flows.map((flow, index) => (
            <div
              key={`preview-${index}`}
              className={`media-item absolute inset-0 transition-opacity duration-300 ${
                activeFlowIndex === index ? 'opacity-100 z-1' : 'opacity-0 z-0'
              }`}
            >
              {flow.media.type === 'video' ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  className="w-full h-full object-cover"
                  src={flow.media.src}
                  poster={flow.media.poster}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={flow.media.src}
                  alt={`Preview of ${flow.page}`}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Hover instruction */}
      <p className="text-center text-sm text-[#395C06] mt-3">
        Hover over a page flow
      </p>
    </div>
  );
}
