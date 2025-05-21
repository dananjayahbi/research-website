'use client';

/**
 * Formats a date string consistently across server and client
 * to avoid hydration mismatches
 * 
 * @param dateString ISO date string (YYYY-MM-DD) or Date object
 * @param format Optional format - 'dmy' (default) for DD/MM/YYYY or 'mdy' for MM/DD/YYYY
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date, format: 'dmy' | 'mdy' = 'dmy'): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Get parts in numeric format (not locale-dependent)
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  // Format based on preference
  if (format === 'mdy') {
    return `${month}/${day}/${year}`;
  }
  
  // Default is 'dmy'
  return `${day}/${month}/${year}`;
}

/**
 * Gets the current year as a string
 * Safe to use in both server and client components
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}
