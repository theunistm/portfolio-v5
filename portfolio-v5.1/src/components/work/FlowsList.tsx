import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { Flow } from './types';

// Icon components (20×20px) - Custom pixelated style
const PlayIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.5 18.75H2.5V17.5H17.5V18.75Z" fill="currentColor"/>
    <path d="M2.5 17.5H1.25V16.25H2.5V17.5Z" fill="currentColor"/>
    <path d="M18.75 17.5H17.5V16.25H18.75V17.5Z" fill="currentColor"/>
    <path d="M1.25 16.25H0V3.75H1.25V16.25Z" fill="currentColor"/>
    <path d="M20 16.25H18.75V3.75H20V16.25Z" fill="currentColor"/>
    <path d="M8.125 5H9.375V6.25H10.625V6.875H11.875V8.125H13.125V8.75H14.375V9.375H15V10.625H14.375V11.25H13.125V11.875H11.875V13.125H10.625V13.75H9.375V15H8.125V15.625H6.875V4.375H8.125V5Z" fill="currentColor"/>
    <path d="M2.5 3.75H1.25V2.5H2.5V3.75Z" fill="currentColor"/>
    <path d="M18.75 3.75H17.5V2.5H18.75V3.75Z" fill="currentColor"/>
    <path d="M17.5 2.5H2.5V1.25H17.5V2.5Z" fill="currentColor"/>
  </svg>
);

const ImageIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.5 17.5H17.5V18.75H2.5V17.5H6.25V16.25H7.5V17.5Z" fill="currentColor"/>
    <path d="M2.5 17.5H1.25V16.25H2.5V17.5Z" fill="currentColor"/>
    <path d="M18.75 17.5H17.5V16.25H18.75V17.5Z" fill="currentColor"/>
    <path d="M1.25 12.5H2.5V13.75H1.25V16.25H0V3.75H1.25V12.5Z" fill="currentColor"/>
    <path d="M8.75 16.25H7.5V15H8.75V16.25Z" fill="currentColor"/>
    <path d="M20 16.25H18.75V11.25H15.625V10H18.75V3.75H20V16.25Z" fill="currentColor"/>
    <path d="M10 15H8.75V13.75H10V15Z" fill="currentColor"/>
    <path d="M13.125 10H14.375V11.25H15.625V12.5H12.5V13.75H10V12.5H7.5V11.25H10V10H11.25V8.75H13.125V10Z" fill="currentColor"/>
    <path d="M3.75 12.5H2.5V11.25H3.75V12.5Z" fill="currentColor"/>
    <path d="M7.5 11.25H3.75V10H7.5V11.25Z" fill="currentColor"/>
    <path d="M10 8.75H8.75V7.5H10V8.75Z" fill="currentColor"/>
    <path d="M15.625 8.75H14.375V7.5H15.625V8.75Z" fill="currentColor"/>
    <path d="M12.8125 8.125H11.5625V5H12.8125V8.125Z" fill="currentColor"/>
    <path d="M8.75 7.5H7.5V6.25H8.75V7.5Z" fill="currentColor"/>
    <path d="M16.875 7.5H15.625V6.25H16.875V7.5Z" fill="currentColor"/>
    <path d="M2.5 3.75H1.25V2.5H2.5V3.75Z" fill="currentColor"/>
    <path d="M18.75 3.75H17.5V2.5H18.75V3.75Z" fill="currentColor"/>
    <path d="M17.5 2.5H2.5V1.25H17.5V2.5Z" fill="currentColor"/>
  </svg>
);

const ViewIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g clipPath="url(#clip0_975_3349)">
      <path d="M19.0508 8.57471H20.0008V11.431H19.0508V8.57471Z" fill="currentColor"/>
      <path d="M18.0938 11.4312H19.05V12.3812H18.0938V11.4312Z" fill="currentColor"/>
      <path d="M18.0938 7.61865H19.05V8.5749H18.0938V7.61865Z" fill="currentColor"/>
      <path d="M17.1445 12.3813H18.0945V13.3376H17.1445V12.3813Z" fill="currentColor"/>
      <path d="M17.1445 6.66895H18.0945V7.61895H17.1445V6.66895Z" fill="currentColor"/>
      <path d="M15.2383 13.3374H17.1445V14.2874H15.2383V13.3374Z" fill="currentColor"/>
      <path d="M15.2383 5.71875H17.1445V6.66875H15.2383V5.71875Z" fill="currentColor"/>
      <path d="M13.3359 14.2876H15.2359V15.2376H13.3359V14.2876Z" fill="currentColor"/>
      <path d="M13.3359 4.7627H15.2359V5.71895H13.3359V4.7627Z" fill="currentColor"/>
      <path d="M13.3375 7.61875H12.3813V6.66875H11.4312V5.71875H8.575V6.66875H7.61875V7.61875H6.66875V8.575H5.71875V11.4312H6.66875V12.3813H7.61875V13.3375H8.575V14.2875H11.4312V13.3375H12.3813V12.3813H13.3375V11.4312H14.2875V8.575H13.3375V7.61875ZM11.4312 10.4813H10.475V11.4312H9.525V10.4813H8.575V9.525H9.525V8.575H10.475V9.525H11.4312V10.4813Z" fill="currentColor"/>
      <path d="M6.66797 15.2373H13.3367V16.1936H6.66797V15.2373Z" fill="currentColor"/>
      <path d="M6.66797 3.8125H13.3367V4.7625H6.66797V3.8125Z" fill="currentColor"/>
      <path d="M4.76172 14.2876H6.66797V15.2376H4.76172V14.2876Z" fill="currentColor"/>
      <path d="M4.76172 4.7627H6.66797V5.71895H4.76172V4.7627Z" fill="currentColor"/>
      <path d="M2.85547 13.3374H4.76172V14.2874H2.85547V13.3374Z" fill="currentColor"/>
      <path d="M2.85547 5.71875H4.76172V6.66875H2.85547V5.71875Z" fill="currentColor"/>
      <path d="M1.90625 12.3813H2.85625V13.3376H1.90625V12.3813Z" fill="currentColor"/>
      <path d="M1.90625 6.66895H2.85625V7.61895H1.90625V6.66895Z" fill="currentColor"/>
      <path d="M0.957031 11.4312H1.90703V12.3812H0.957031V11.4312Z" fill="currentColor"/>
      <path d="M0.957031 7.61865H1.90703V8.5749H0.957031V7.61865Z" fill="currentColor"/>
      <path d="M0 8.57471H0.95625V11.431H0V8.57471Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_975_3349">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const getIcon = (iconType: Flow['iconType'] = 'play', color: string) => {
  switch (iconType) {
    case 'image':
      return <ImageIcon color={color} />;
    case 'view':
      return <ViewIcon color={color} />;
    case 'play':
    default:
      return <PlayIcon color={color} />;
  }
};

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
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* Leading icon */}
              <span className="flex-shrink-0" style={{ color: projectColor }}>
                {getIcon(flow.iconType, projectColor)}
              </span>
              
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
