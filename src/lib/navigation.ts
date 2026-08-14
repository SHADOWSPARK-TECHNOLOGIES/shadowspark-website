/** Public destinations owned by the corporate navigation shell. */
export const navigationLinks = [
  { label: 'Systems', href: '/#solutions' },
  { label: 'Work', href: '/#case-study' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Tailwind's default `lg` minimum width used by Navigation. */
export const NAVIGATION_DESKTOP_MIN_WIDTH = 1024;

export type NavigationMenuAction = 'toggle' | 'close';
export type NavigationMode = 'mobile' | 'desktop';

/** Minimal focus contract required to restore keyboard position after Escape. */
export interface NavigationFocusTarget {
  focus(): void;
}

/** Returns the next disclosure state for menu controls and link activation. */
export function nextNavigationMenuState(
  open: boolean,
  action: NavigationMenuAction,
): boolean {
  return action === 'toggle' ? !open : false;
}

/** Returns the navigation presentation at a measured viewport width. */
export function navigationModeForWidth(width: number): NavigationMode {
  return width >= NAVIGATION_DESKTOP_MIN_WIDTH ? 'desktop' : 'mobile';
}

/**
 * Closes a disclosure on Escape and restores focus to its trigger.
 *
 * @returns Whether the supplied key was handled.
 */
export function handleNavigationEscape(
  key: string,
  close: () => void,
  trigger: NavigationFocusTarget | null,
): boolean {
  if (key !== 'Escape') return false;

  close();
  trigger?.focus();
  return true;
}

/** Limits the corrected top-level landmark shell to the approved route scope. */
export function usesCorporatePageLandmarks(pathname: string): boolean {
  return pathname === '/architecture' || pathname.startsWith('/architecture/');
}
