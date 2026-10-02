/**
 * Centralized API client and configuration for SmartHome OS.
 * Automatically adapts between browser runtime, server-side rendering (SSR),
 * local development, and Docker container networking.
 */

export const getApiBaseUrl = (): string => {
  // If running on the server (Node.js / Next SSR inside Docker)
  if (typeof window === 'undefined') {
    return (
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:5000/api'
    );
  }

  // If running in the browser
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // In production with reverse proxy, use relative /api
  if (process.env.NODE_ENV === 'production') {
    return '/api';
  }

  // Default local dev fallback
  return 'http://localhost:5000/api';
};

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

/**
 * Perform a typed API fetch with automatic base URL resolution.
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data?: ApiResponse<T>; error?: string }> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const data = await res.json().catch(() => null);

    return {
      ok: res.ok,
      status: res.status,
      data,
      error: !res.ok ? (data?.error || `HTTP error ${res.status}`) : undefined,
    };
  } catch (err: any) {
    console.error(`[API] Network error fetching ${url}:`, err);
    return {
      ok: false,
      status: 0,
      error: err.message || 'Unable to connect to the server',
    };
  }
}
