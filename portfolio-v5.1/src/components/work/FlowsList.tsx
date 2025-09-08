import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { Flow } from './types';

interface FlowsListProps {
  flows: Flow[];
  projectColor: string;
}

export default function FlowsList({ flows, projectColor }: FlowsListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flowRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Custom event for notifying the PhonePreview component
  const updatePreview = (index: number) => {
    const event = new CustomEvent('updatePhonePreview', { 
      detail: { flowIndex: index } 
    });
    window.dispatchEvent(event);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (index < flows.length - 1) {
          setActiveIndex(index + 1);
          updatePreview(index + 1);
          flowRefs.current[index + 1]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          setActiveIndex(index - 1);
          updatePreview(index - 1);
          flowRefs.current[index - 1]?.focus();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setActiveIndex(index);
        updatePreview(index);
        break;
      default:
        break;
    }
  };

  // Set initial active flow on mount
  useEffect(() => {
    updatePreview(0);
  }, []);

  return (
    <div className="flows-list">
      {flows.map((flow, index) => (
        <div
          key={`flow-${index}`}
          ref={(el) => { flowRefs.current[index] = el; }}
          className={`flow-row py-3 ${activeIndex === index ? 'is-active' : ''}`}
          role="button"
          tabIndex={0}
          aria-pressed={activeIndex === index}
          onClick={() => {
            setActiveIndex(index);
            updatePreview(index);
          }}
          onMouseEnter={() => {
            setActiveIndex(index);
            updatePreview(index);
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            color: activeIndex === index ? projectColor : 'inherit'
          }}
        >
          <div className="flex items-start gap-4">
            {/* Page name */}
            <div className="w-32">
              <h5 className="text-[color:var(--project)] font-medium" style={{ color: projectColor }}>
                {flow.page}
              </h5>
            </div>
            
            {/* Interaction points */}
            <div className="w-44 text-[#500F0B]/70 text-sm">
              {flow.interactions}
            </div>
            
            {/* Challenge */}
            <div className="flex-grow text-sm">
              <span className="challenge mr-2" title={flow.challenge}>Challenge</span>
              
              {/* Arrow icon - purely decorative */}
              <span 
                className="arrow" 
                aria-hidden="true"
                style={{ color: projectColor }}
              >
                <svg width="12" height="6" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4.5H15V3.5H0V4.5Z" fill="currentColor"/>
                </svg>
              </span>
              
              <span className="solution ml-2" title={flow.solution}>Solution</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
