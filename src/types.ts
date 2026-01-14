/**
 * Shared type definitions.
 */

export type ViewType = 'home' | 'account';

export interface NavigationProps {
  onNavigate: (view: ViewType) => void;
}
