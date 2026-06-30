import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const injectStyles = () => {
  const id = 'scroll-reveal-styles';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    .scroll-reveal {
      margin: 20px 0;
    }
    .scroll-reveal-text {
      font-size: clamp(1.6rem, 4vw, 3rem);
      line-height: 1.5;
      font-weight: 600;
    }
    .word {
      display: inline-block;
    }
    .scroll-reveal-text.animate-shiny-text .word {
      display: inline;
    }
  `;
  document.head.appendChild(style);
};

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  style = {},
  textStyle = {},
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  // Inject styles on component load
  useEffect(() => {
    injectStyles();
  }, []);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true
          }
        }
      );

      const wordElements = el.querySelectorAll('.word');

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    // Recalculate ScrollTrigger points after the preloader finishes unmounting
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handlePreloaderComplete = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('preloaderComplete', handlePreloaderComplete);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('preloaderComplete', handlePreloaderComplete);
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`} style={style}>
      <p className={`scroll-reveal-text ${textClassName}`} style={textStyle}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
