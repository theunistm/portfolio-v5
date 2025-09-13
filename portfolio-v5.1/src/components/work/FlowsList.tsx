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
          className={`flow-row group py-2 text-[#395C06]`}
          role="presentation"
          tabIndex={0}
          onClick={() => {
            // No click behavior; not interactive, preview updates only on hover/focus
          }}
          onMouseEnter={() => {
            updatePreview(index);
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          <div className="inline-flex items-center gap-3 group-hover:bg-[#DFE7DB] transition-colors">
            {/* Page name */}
            <div className="w-32">
              <h5 className="text-[#395C06] font-medium">
                {flow.page}
              </h5>
            </div>
            
            {/* Interaction points - Hidden for now, can be re-enabled in future */}
            {/* <div className="w-44 text-[#500F0B]/70 text-sm">
              {flow.interactions}
            </div> */}
            
            {/* Challenge and Solution */}
            <div className="text-lg text-[#395C06]">
              <div className="flex items-center whitespace-nowrap">
                <span
                  className="challenge tip underline decoration-current decoration-1 underline-offset-[3px] mr-2 relative cursor-default"
                  aria-label={flow.challenge}
                  data-tip={flow.challenge}
                >
                  Challenge
                </span>
                
                {/* Custom Arrow icon - purely decorative */}
                <span 
                  className="arrow mx-1 flex-shrink-0" 
                  aria-hidden="true"
                >
                  <img 
                    src="/images/arrow-icon.svg?v=2" 
                    alt="" 
                    width="24" 
                    height="12"
                  />
                </span>
                
                <span
                  className="solution tip underline decoration-current decoration-1 underline-offset-[3px] ml-2 relative cursor-default"
                  aria-label={flow.solution}
                  data-tip={flow.solution}
                >
                  Solution
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
