// Curated font pairings for the public folio. The operator picks one from
// MyFolioSettings; the slug page validates and falls back to 'classic' so
// invalid values can never break rendering.
//
// Keep these in sync with:
//   - profiles_folio_font_theme_check constraint (migration 20260425120000)
//   - FOLIO_FONT_THEMES in opervo-work-flow/src/components/MyFolioSettings.tsx

export type FolioFontTheme = 'classic' | 'modern' | 'bold' | 'editorial'

export interface FolioFontPairing {
  /** Google Fonts CSS2 URL — loaded via @import in FolioPage's GLOBAL_STYLES */
  fontsHref: string
  /** Used for hero name, section titles, prices, review quote */
  display: string
  /** Used for body copy, buttons, form fields */
  body: string
}

export const FOLIO_FONT_THEMES: Record<FolioFontTheme, FolioFontPairing> = {
  classic: {
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap',
    display: "'Cormorant Garamond', serif",
    body: "'Jost', sans-serif",
  },
  modern: {
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  bold: {
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700&display=swap',
    display: "'Archivo Black', sans-serif",
    body: "'Inter', sans-serif",
  },
  editorial: {
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Source+Sans+3:wght@300;400;500;600;700&display=swap',
    display: "'Playfair Display', serif",
    body: "'Source Sans 3', sans-serif",
  },
}

export const FOLIO_FONT_THEME_KEYS: FolioFontTheme[] = [
  'classic',
  'modern',
  'bold',
  'editorial',
]

export function resolveFolioFontTheme(value: unknown): FolioFontTheme {
  return typeof value === 'string' &&
    (FOLIO_FONT_THEME_KEYS as string[]).includes(value)
    ? (value as FolioFontTheme)
    : 'classic'
}
