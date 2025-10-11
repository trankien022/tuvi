// Global type declarations

declare global {
  interface Window {
    gtag?: (command: 'config' | 'event' | 'exception', targetId: string, config?: Record<string, any>) => void;
    Sentry?: {
      captureException: (error: Error, context?: any) => void;
    };
    gtagEvents?: Array<{
      event: string;
      action: string;
      params: any;
    }>;
    toggleFAQ?: (button: HTMLElement) => void;
  }

  // Performance API extensions
  interface PerformanceEntry {
    processingStart?: number;
  }

  // Element extensions for lazy loading
  interface Element {
    dataset: DOMStringMap;
    src?: string;
  }

  // Event target extensions
  interface EventTarget {
    closest?: (selector: string) => Element | null;
    textContent?: string | null;
  }
}

export {};
