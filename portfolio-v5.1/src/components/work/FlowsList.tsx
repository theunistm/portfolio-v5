import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { Flow } from './types';

type FlowsListProps = {
  flows: Flow[];
  projectColor: string;
  channelId: string;
};

export default function FlowsList({ flows, projectColor, channelId }: FlowsListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const dispatch = (type: 'show' | 'clear', payload?: any) => {
    const container = document.getElementById(channelId);
    if (!container) return;
    const evtName = type === 'show' ? 'flow:show' : 'flow:clear';
    container.dispatchEvent(new CustomEvent(evtName, { detail: payload }));
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
        dispatch('show', flows[index]?.media);
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
          className={`flow-row py-2 text-[#395C06] block`}
        >
          <div 
            ref={(el) => { flowRefs.current[index] = el; }}
            className="group inline-flex items-center gap-3 hover:bg-[#DFE7DB] transition-colors"
            role="presentation"
            tabIndex={0}
            onClick={() => {
              // No click behavior; not interactive, preview updates only on hover/focus
            }}
            onMouseEnter={() => dispatch('show', flows[index]?.media)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onMouseLeave={() => dispatch('clear')}
            onBlur={() => dispatch('clear')}
          >
            {/* Page name */}
            <div className="flex-shrink-0">
              <h5 className="font-medium whitespace-nowrap" style={{ color: projectColor }}>
                {flow.page}
              </h5>
            </div>
            
            {/* Interaction points - Hidden for now, can be re-enabled in future */}
            {/* <div className="w-44 text-[#500F0B]/70 text-sm">
              {flow.interactions}
            </div> */}
            
            {/* Challenge and Solution */}
            <div className="text-lg flex-shrink-0" style={{ color: projectColor }}>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 17.25H11.25V15.75H14.25V17.25Z" fill={projectColor}/>
                    <path d="M15.75 15.75H14.25V14.25H15.75V15.75Z" fill={projectColor}/>
                    <path d="M17.25 11.25H18.75V12.75H17.25V14.25H15.75V12.75H5.25V11.25H15.75V9.75H17.25V11.25Z" fill={projectColor}/>
                    <path d="M15.75 9.75H14.25V8.25H15.75V9.75Z" fill={projectColor}/>
                    <path d="M14.25 8.25H11.25V6.75H14.25V8.25Z" fill={projectColor}/>
                  </svg>
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
