// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-4TTPYM85FX';

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, label?: string) {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    transport_type: 'beacon',
    url: url,
  });
}

/**
 * Track project page views
 */
export function trackProjectView(slug: string, projectTitle: string) {
  trackEvent('view_project', {
    project_slug: slug,
    project_title: projectTitle,
  });
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent('click', {
    event_category: 'button',
    event_label: buttonName,
    location: location,
  });
}

/**
 * Track copy actions (e.g., PRD copy, JSON copy)
 */
export function trackCopy(contentType: string, location?: string) {
  trackEvent('copy', {
    event_category: 'content',
    event_label: contentType,
    location: location,
  });
}

/**
 * Track image expansions
 */
export function trackImageExpand(imageName: string) {
  trackEvent('image_expand', {
    event_category: 'media',
    event_label: imageName,
  });
}

/**
 * Track section navigation (Contents menu clicks)
 */
export function trackSectionNavigation(sectionId: string, projectSlug?: string) {
  trackEvent('section_navigation', {
    section_id: sectionId,
    project_slug: projectSlug,
  });
}
