import { useRef, useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const injectStyles = () => {
  const id = "shuffle-component-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    .shuffle-parent {
      display: inline-block;
      white-space: normal;
      word-wrap: break-word;
      will-change: transform;
      visibility: hidden;
    }

    .shuffle-parent.is-ready {
      visibility: visible;
    }

    .shuffle-char-wrapper {
      display: inline-block;
      overflow: hidden;
      vertical-align: baseline;
      position: relative;
    }

    .shuffle-char-wrapper > span {
      display: inline-flex;
      will-change: transform;
    }

    .shuffle-char {
      line-height: 1.2;
      display: inline-block;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
};

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const ref = useRef(null);
  const wrappersRef = useRef([]);

  const [charSizes, setCharSizes] = useState([]);
  const [measured, setMeasured] = useState(false);
  const [ready, setReady] = useState(() => {
    if (typeof window !== 'undefined' && respectReducedMotion && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [prevText, setPrevText] = useState(text);
  if (text !== prevText) {
    setPrevText(text);
    setMeasured(false);
    setCharSizes([]);
  }

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMeasured(false);
        setCharSizes([]);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const rolls = useMemo(() => Math.max(1, Math.floor(shuffleTimes)), [shuffleTimes]);

  useLayoutEffect(() => {
    if (!ref.current || measured || !text) return;

    const measure = () => {
      const measureSpans = ref.current.querySelectorAll('.shuffle-char-measure');
      if (measureSpans.length === 0) return;

      const sizes = Array.from(measureSpans).map((span) => {
        const rect = span.getBoundingClientRect();
        const charVal = span.textContent;

        const scrambled = [];
        for (let k = 0; k < rolls; k++) {
          const randVal = scrambleCharset
            ? scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length))
            : charVal;
          scrambled.push(randVal);
        }

        return {
          char: charVal,
          w: rect.width,
          h: rect.height,
          scrambled
        };
      });
      setCharSizes(sizes);
      setMeasured(true);
    };

    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') {
        measure();
      } else {
        document.fonts.ready.then(measure);
      }
    } else {
      measure();
    }
  }, [text, measured, rolls, scrambleCharset]);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';

  useEffect(() => {
    if (!ref.current || !measured || charSizes.length === 0) return;
    if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onShuffleComplete?.();
      return;
    }

    let hoverHandler = null;
    let tl = null;
    let stInstance = null;
    let playing = false;

    const el = ref.current;
    const start = scrollTriggerStart;
    const inners = Array.from(el.querySelectorAll('.shuffle-char-inner'));

    const stepsVal = rolls + 1;
    const isVerticalVal = shuffleDirection === 'up' || shuffleDirection === 'down';

    const getX = (inner, isStart) => {
      const w = inner.parentElement.getBoundingClientRect().width;
      if (shuffleDirection === 'right') {
        return isStart ? -stepsVal * w : 0;
      } else if (shuffleDirection === 'left') {
        return isStart ? 0 : -stepsVal * w;
      }
      return 0;
    };

    const getY = (inner, isStart) => {
      const h = inner.parentElement.getBoundingClientRect().height;
      if (shuffleDirection === 'down') {
        return isStart ? -stepsVal * h : 0;
      } else if (shuffleDirection === 'up') {
        return isStart ? 0 : -stepsVal * h;
      }
      return 0;
    };

    const removeHover = () => {
      if (hoverHandler && el) {
        el.removeEventListener('mouseenter', hoverHandler);
        hoverHandler = null;
      }
    };

    const teardown = () => {
      if (tl) {
        tl.kill();
        tl = null;
      }
      playing = false;
    };

    const randomizeScrambles = () => {
      if (!scrambleCharset) return;
      inners.forEach(inner => {
        const scrambleSpans = inner.querySelectorAll('[data-scramble="1"]');
        scrambleSpans.forEach(span => {
          span.textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
        });
      });
    };

    const ctx = gsap.context(() => {
      const play = () => {
        teardown();

        if (scrambleCharset) randomizeScrambles();

        gsap.set(inners, {
          x: (i, target) => getX(target, true),
          y: (i, target) => getY(target, true),
          force3D: true,
          color: colorFrom || 'inherit'
        });

        playing = true;

        tl = gsap.timeline({
          smoothChildTiming: true,
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: () => {
            if (scrambleCharset) randomizeScrambles();
            gsap.set(inners, {
              x: (i, target) => getX(target, true),
              y: (i, target) => getY(target, true),
            });
            onShuffleComplete?.();
          },
          onComplete: () => {
            playing = false;
            if (!loop) {
              if (colorTo) gsap.set(inners, { color: colorTo });
              onShuffleComplete?.();
              armHover();
            }
          }
        });

        const addTween = (targets, at) => {
          const vars = {
            duration,
            ease,
            force3D: true,
            stagger: animationMode === 'evenodd' ? stagger : 0
          };
          if (isVerticalVal) {
            vars.y = (i, target) => getY(target, false);
          } else {
            vars.x = (i, target) => getX(target, false);
          }

          tl.to(targets, vars, at);

          if (colorFrom && colorTo) {
            tl.to(targets, { color: colorTo, duration, ease }, at);
          }
        };

        if (animationMode === 'evenodd') {
          const odd = inners.filter((_, i) => i % 2 === 1);
          const even = inners.filter((_, i) => i % 2 === 0);
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
          const evenStart = odd.length ? oddTotal * 0.7 : 0;
          if (odd.length) addTween(odd, 0);
          if (even.length) addTween(even, evenStart);
        } else {
          inners.forEach(inner => {
            const d = Math.random() * maxDelay;
            const vars = {
              duration,
              ease,
              force3D: true
            };
            if (isVerticalVal) {
              vars.y = getY(inner, false);
            } else {
              vars.x = getX(inner, false);
            }
            tl.to(inner, vars, d);
            if (colorFrom && colorTo) {
              tl.fromTo(inner, { color: colorFrom }, { color: colorTo, duration, ease }, d);
            }
          });
        }
      };

      const armHover = () => {
        if (!triggerOnHover || !el) return;
        removeHover();
        hoverHandler = () => {
          if (playing) return;
          play();
        };
        el.addEventListener('mouseenter', hoverHandler);
      };

      const create = () => {
        play();
        armHover();
        setReady(true);
      };

      stInstance = ScrollTrigger.create({
        trigger: el,
        start,
        once: triggerOnce,
        onEnter: create
      });
    }, ref);

    return () => {
      ctx.revert();
      removeHover();
      teardown();
      if (stInstance) {
        stInstance.kill();
      }
      setReady(false);
    };
  }, [
    measured,
    charSizes,
    text,
    duration,
    maxDelay,
    ease,
    scrollTriggerStart,
    shuffleDirection,
    rolls,
    animationMode,
    loop,
    loopDelay,
    stagger,
    scrambleCharset,
    colorFrom,
    colorTo,
    triggerOnce,
    respectReducedMotion,
    triggerOnHover,
    onShuffleComplete
  ]);

  const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(() => `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`, [ready, className]);
  const Tag = tag || 'p';

  if (!text) return null;

  if (!measured) {
    return (
      <Tag
        ref={ref}
        className={`shuffle-parent ${className}`}
        style={{ ...commonStyle, visibility: 'hidden' }}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="shuffle-char-measure"
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={classes} style={commonStyle}>
      {charSizes.map((size, idx) => {
        const { char, w, h, scrambled } = size;
        const firstOrig = char;
        const finalOrig = char;

        let items = [];
        if (shuffleDirection === 'right' || shuffleDirection === 'down') {
          items = [finalOrig, ...scrambled, firstOrig];
        } else {
          items = [firstOrig, ...scrambled, finalOrig];
        }

        return (
          <span
            key={idx}
            className="shuffle-char-wrapper"
            ref={(el) => {
              if (el) wrappersRef.current[idx] = el;
            }}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              width: `${w}px`,
              height: isVertical ? `${h}px` : 'auto',
              verticalAlign: 'bottom',
            }}
          >
            <span
              className="shuffle-char-inner"
              style={{
                display: 'inline-block',
                whiteSpace: isVertical ? 'normal' : 'nowrap',
                willChange: 'transform',
              }}
            >
              {items.map((item, itemIdx) => {
                const isScramble = itemIdx > 0 && itemIdx < items.length - 1;
                return (
                  <span
                    key={itemIdx}
                    className="shuffle-char"
                    data-scramble={isScramble ? "1" : undefined}
                    style={{
                      display: isVertical ? 'block' : 'inline-block',
                      width: `${w}px`,
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};

export default Shuffle;
