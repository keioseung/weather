/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_MAP_TILE_URL: string
  readonly VITE_MAP_ATTRIBUTION: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_ENABLE_OFFLINE_MODE: string
  readonly VITE_DEV_MODE: string
  readonly VITE_ENABLE_DEBUG_LOGS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
