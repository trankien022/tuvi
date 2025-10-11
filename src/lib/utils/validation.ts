/**
 * Validation Utilities
 * Helper functions for form validation and data sanitization
 */

import { VALIDATION_CONFIG } from '~/config/constants.ts';

// ===========================
// Phone Number Validation & Formatting
// ===========================
export function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;

  return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
}

export function isValidPhoneNumber(phone: string): boolean {
  return VALIDATION_CONFIG.phone.pattern.test(phone);
}

export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

// ===========================
// Email Validation
// ===========================
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= VALIDATION_CONFIG.email.maxLength;
}

// ===========================
// Name Validation
// ===========================
export function isValidName(name: string): boolean {
  return name.length >= VALIDATION_CONFIG.name.minLength && name.length <= VALIDATION_CONFIG.name.maxLength;
}

export function normalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// ===========================
// Date Validation
// ===========================
export function isValidBirthDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const minAge = 13;
  const maxAge = 120;

  const age = now.getFullYear() - date.getFullYear();

  return !isNaN(date.getTime()) && age >= minAge && age <= maxAge;
}

export function formatDate(dateString: string, format = 'DD/MM/YYYY'): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return format.replace('DD', day).replace('MM', month).replace('YYYY', String(year));
}

// ===========================
// Sanitization
// ===========================
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// ===========================
// String Utilities
// ===========================
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// ===========================
// URL Validation
// ===========================
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function buildUrl(base: string, params: Record<string, string | number>): string {
  const url = new URL(base, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
}
