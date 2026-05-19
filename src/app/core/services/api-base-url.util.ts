import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

const LOCAL_API_BASE_URL = '/wp-json/api/v1';
const REMOTE_API_BASE_URL = 'https://admin.etmsas.com/wp-json/api/v1';

export function resolveApiBaseUrl(): string {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return REMOTE_API_BASE_URL;
  }

  if (typeof location !== 'undefined') {
    const { hostname } = location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return LOCAL_API_BASE_URL;
    }
  }

  return REMOTE_API_BASE_URL;
}
