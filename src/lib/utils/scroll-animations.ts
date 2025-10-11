/**
 * Scroll Animations Utility
 * Handles Intersection Observer for scroll-triggered animations
 */

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Initialize scroll animations on the page
 */
export function initScrollAnimations(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations if user prefers reduced motion
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animation = element.dataset.animation || 'fade-up';
          const delay = parseInt(element.dataset.delay || '0', 10);

          // Apply animation with delay
          setTimeout(() => {
            element.classList.add('is-visible');
            
            // Apply Tailwind animation class
            switch (animation) {
              case 'fade-up':
                element.classList.add('animate-fade-up');
                break;
              case 'fade-down':
                element.classList.add('animate-fade-down');
                break;
              case 'fade-left':
                element.classList.add('animate-fade-left');
                break;
              case 'fade-right':
                element.classList.add('animate-fade-right');
                break;
              case 'fade-in':
                element.classList.add('animate-fade-in');
                break;
              case 'scale-up':
                element.classList.add('animate-scale-up');
                break;
              case 'slide-up':
                element.classList.add('animate-slide-up');
                break;
              case 'zoom-in':
                element.classList.add('animate-zoom-in');
                break;
              default:
                element.classList.add('animate-fade-up');
            }
          }, delay);

          // Stop observing if once is true
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // Reset animation if not once
          const element = entry.target as HTMLElement;
          element.classList.remove('is-visible');
          element.classList.remove(
            'animate-fade-up',
            'animate-fade-down',
            'animate-fade-left',
            'animate-fade-right',
            'animate-fade-in',
            'animate-scale-up',
            'animate-slide-up',
            'animate-zoom-in'
          );
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  // Observe all elements with scroll-reveal class
  const elements = document.querySelectorAll('.scroll-reveal');
  elements.forEach((element) => {
    const elementThreshold = parseFloat((element as HTMLElement).dataset.threshold || threshold.toString());
    
    // Create separate observer for elements with custom threshold
    if (elementThreshold !== threshold) {
      const customObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const animation = el.dataset.animation || 'fade-up';
              const delay = parseInt(el.dataset.delay || '0', 10);

              setTimeout(() => {
                el.classList.add('is-visible');
                el.classList.add(`animate-${animation}`);
              }, delay);

              if (once) {
                customObserver.unobserve(el);
              }
            }
          });
        },
        {
          threshold: elementThreshold,
          rootMargin,
        }
      );
      customObserver.observe(element);
    } else {
      observer.observe(element);
    }
  });

  return observer;
}

/**
 * Add scroll animation to an element programmatically
 */
export function addScrollAnimation(
  element: HTMLElement,
  animation: string = 'fade-up',
  delay: number = 0
) {
  element.classList.add('scroll-reveal', 'opacity-0');
  element.dataset.animation = animation;
  element.dataset.delay = delay.toString();
}

/**
 * Stagger animations for a group of elements
 */
export function staggerAnimations(
  selector: string,
  animation: string = 'fade-up',
  delayIncrement: number = 100,
  startDelay: number = 0
) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    const totalDelay = startDelay + (index * delayIncrement);
    addScrollAnimation(htmlElement, animation, totalDelay);
  });
}

