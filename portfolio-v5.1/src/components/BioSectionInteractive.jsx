import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bioData from '../data/bio.json';

// No longer needed to generate multiple segments
// We'll use a single rectangle for highlighting

const HighlightedWord = ({ word, expansion, onClick }) => {
  return (
    <motion.span 
      className="relative inline-block cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
    >
      {/* Simple rectangular highlight */}
      <span 
        className="absolute bg-[#500F0B]/8 pointer-events-none" 
        style={{ 
          height: 'calc(100% - 4px)', 
          width: '100%',
          top: '2px',
          left: 0
        }}
      />
      
      {/* The actual text */}
      <span className="relative z-10 font-medium">{word}</span>
    </motion.span>
  );
};

const ExpandingWord = ({ word, expansion, onAnimationComplete }) => {
  // Reference to track if animation completed
  const animationCompleted = useRef(false);
  
  // Split the expanded text into words for animated appearance
  const words = expansion.text.split(' ');
  
  // Calculate a total duration based on word count (min 0.5s, max 0.8s)
  const animationDuration = Math.min(0.8, Math.max(0.5, 0.3 + (words.length * 0.05)));
  
  return (
    <>
      {/* Original word with highlight animation */}
      <span className="relative inline-block">
        {word}
        
        {/* Simple expanding highlight that stretches and fades */}
        <motion.span 
          className="absolute bg-[#500F0B]/8 pointer-events-none" 
          style={{ 
            height: 'calc(100% - 4px)', 
            top: '2px',
            left: 0
          }}
          initial={{ width: '100%' }}
          animate={{ width: '100%', opacity: [1, 1, 0] }}
          transition={{ 
            opacity: { times: [0, 0.7, 1], duration: animationDuration * 1.5 },
            duration: animationDuration
          }}
        />
      </span>
      
      {/* Space after word */}
      {' '}
      
      {/* Animated words appearing one by one - IMPORTANT: no wrapper containers! */}
      {words.map((w, i) => (
        <React.Fragment key={`${word}-expansion-${i}`}>
          <motion.span
            // Use display: inline specifically to ensure natural text flow
            style={{ display: 'inline', whiteSpace: 'normal' }}
            initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: { 
                delay: i * 0.08, 
                duration: 0.25,
                type: "spring", 
                damping: 15
              } 
            }}
            onAnimationComplete={() => {
              // Only trigger the completion callback on the last word
              if (i === words.length - 1 && !animationCompleted.current) {
                animationCompleted.current = true;
                onAnimationComplete && onAnimationComplete();
              }
            }}
          >
            {w}
          </motion.span>
          {/* Explicit space character between words */}
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </>
  );
};

const BioSectionInteractive = ({ className = "h5" }) => {
  const [expandedWords, setExpandedWords] = useState({});
  
  // Parse the text and identify interactive words
  const parseBioText = () => {
    const parts = [];
    const text = bioData.text;
    const interactiveWords = bioData.interactiveWords || [];
    
    // Function to check if a position is inside any interactive word range
    const isInsideInteractiveWord = (position) => {
      return interactiveWordRanges.some(range => 
        position >= range.start && position < range.end
      );
    };
    
    // Find all interactive words and their positions in the text
    const interactiveWordRanges = [];
    interactiveWords.forEach(word => {
      let startPos = 0;
      while (true) {
        const pos = text.indexOf(word, startPos);
        if (pos === -1) break;
        
        // Make sure we're matching whole words, not parts of other words
        const beforeChar = pos > 0 ? text[pos - 1] : ' ';
        const afterChar = pos + word.length < text.length ? text[pos + word.length] : ' ';
        
        if (!/[a-zA-Z0-9]/.test(beforeChar) && !/[a-zA-Z0-9]/.test(afterChar)) {
          interactiveWordRanges.push({
            start: pos,
            end: pos + word.length,
            word
          });
        }
        startPos = pos + 1;
      }
    });
    
    // Sort ranges by starting position
    interactiveWordRanges.sort((a, b) => a.start - b.start);
    
    // Build the parts array by splitting at interactive word boundaries
    let lastIndex = 0;
    
    interactiveWordRanges.forEach(range => {
      // Add text before this interactive word
      if (range.start > lastIndex) {
        parts.push({ 
          type: 'text', 
          content: text.substring(lastIndex, range.start) 
        });
      }
      
      // Add the interactive word
      parts.push({ 
        type: 'interactive', 
        word: range.word,
        expanded: !!expandedWords[range.word],
        expansion: bioData.expansions[range.word]
      });
      
      lastIndex = range.end;
    });
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }
    
    return parts;
  };
  
  const handleWordClick = (word) => {
    setExpandedWords(prev => ({
      ...prev,
      [word]: true
    }));
  };
  
  const bioTextParts = parseBioText();
  
  return (
    <p className={`bio-section ${className} m-0`}>
      {bioTextParts.map((part, index) => {
        if (part.type === 'text') {
          // Just return the text directly, without a span wrapper
          return part.content;
        } else if (part.type === 'interactive') {
          if (part.expanded) {
            return (
              <ExpandingWord 
                key={index}
                word={part.word} 
                expansion={part.expansion} 
              />
            );
          } else {
            return (
              <HighlightedWord 
                key={index} 
                word={part.word} 
                expansion={part.expansion}
                onClick={() => handleWordClick(part.word)}
              />
            );
          }
        }
        return null;
      })}
    </p>
  );
};

export default BioSectionInteractive;
