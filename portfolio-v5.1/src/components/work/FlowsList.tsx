import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { Flow } from './types';

type FlowsListProps = {
  flows: Flow[];
  projectColor: string;
  hoverColor: string;
  channelId: string;
};

export default function FlowsList({ flows, projectColor, hoverColor, channelId }: FlowsListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const dispatch = (type: 'show' | 'clear', payload?: any) => {
    const container = document.getElementById(channelId);
    if (!container) return;
    const evtName = type === 'show' ? 'flow:show' : 'flow:clear';
    container.dispatchEvent(new CustomEvent(evtName, { detail: payload }));
  };

  const dispatchMobilePreview = (flowIndex: number) => {
    const container = document.getElementById(channelId);
    if (!container) return;
    const flow = flows[flowIndex];
    if (!flow) return;
    container.dispatchEvent(new CustomEvent('flow:openMobilePreview', { 
      detail: { media: flow.media, flowName: flow.page } 
    }));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (index < flows.length - 1) {
          setActiveIndex(index + 1);
          dispatch('show', flows[index + 1]?.media);
          flowRefs.current[index + 1]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          setActiveIndex(index - 1);
          dispatch('show', flows[index - 1]?.media);
          flowRefs.current[index - 1]?.focus();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setActiveIndex(index);
        // On mobile/tablet, open modal; on desktop, show in side preview
        if (window.innerWidth < 1024) {
          dispatchMobilePreview(index);
        } else {
          dispatch('show', flows[index]?.media);
        }
        break;
      default:
        break;
    }
  };

  // Don't auto-show first flow - let user hover to trigger preview

  return (
    <div className="flows-list">
      {flows.map((flow, index) => (
        <div
          key={`flow-${index}`}
          className={`flow-row py-1.5 md:py-2 text-[#395C06] block`}
        >
          <div 
            ref={(el) => { flowRefs.current[index] = el; }}
            className="group inline-flex items-center gap-2 md:gap-3 transition-colors"
            style={{
              ['--hover-bg' as any]: hoverColor
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverColor;
              dispatch('show', flows[index]?.media);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
              dispatch('clear');
            }}
            role="presentation"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onBlur={() => dispatch('clear')}
          >
            {/* Page name - clickable on mobile/tablet only */}
            <div className="flex-shrink-0">
              <button
                className="font-bold whitespace-nowrap text-base md:text-lg lg:cursor-default text-left min-h-[44px] lg:min-h-0 flex items-center hover:opacity-80 lg:hover:opacity-100 active:opacity-60 lg:active:opacity-100 transition-opacity lg:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-sm lg:focus-visible:ring-0"
                style={{ color: projectColor }}
                onClick={(e) => {
                  // Only open modal on mobile/tablet (< 1024px)
                  if (window.innerWidth < 1024) {
                    e.stopPropagation();
                    dispatchMobilePreview(index);
                  }
                }}
                aria-label={`View ${flow.page} preview`}
              >
                {flow.page}
              </button>
            </div>
            
            {/* Interaction points - Hidden for now, can be re-enabled in future */}
            {/* <div className="w-44 text-[#500F0B]/70 text-sm">
              {flow.interactions}
            </div> */}
            
            {/* Challenge and Solution */}
            <div className="text-sm md:text-base lg:text-lg flex-shrink-0" style={{ color: projectColor }}>
              <div className="flex items-center whitespace-nowrap">
                <span
                  className="challenge tip underline decoration-current decoration-1 underline-offset-[3px] mr-1 md:mr-2 relative cursor-default"
                  aria-label={flow.challenge}
                  data-tip={flow.challenge}
                  onClick={(e) => e.stopPropagation()}
                >
                  Challenge
                </span>
                
                {/* Custom Arrow icon - purely decorative */}
                <span 
                  className="arrow mx-0.5 md:mx-1 flex-shrink-0" 
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 17.25H11.25V15.75H14.25V17.25Z" fill={projectColor}/>
                    <path d="M15.75 15.75H14.25V14.25H15.75V15.75Z" fill={projectColor}/>
                    <path d="M17.25 11.25H18.75V12.75H17.25V14.25H15.75V12.75H5.25V11.25H15.75V9.75H17.25V11.25Z" fill={projectColor}/>
                    <path d="M15.75 9.75H14.25V8.25H15.75V9.75Z" fill={projectColor}/>
                    <path d="M14.25 8.25H11.25V6.75H14.25V8.25Z" fill={projectColor}/>
                  </svg>
                </span>
                
                <span
                  className="solution tip underline decoration-current decoration-1 underline-offset-[3px] ml-1 md:ml-2 relative cursor-default"
                  aria-label={flow.solution}
                  data-tip={flow.solution}
                  onClick={(e) => e.stopPropagation()}
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
