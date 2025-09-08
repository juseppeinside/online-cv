import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOBILE_REGEX = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;

export function checkIsMobile() {
  return MOBILE_REGEX.test(navigator.userAgent);
}

export const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';
