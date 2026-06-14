// Pure presentational inline-SVG icon set (Lucide-style stroke icons).
// No 'use client', no hooks, safe inside both server and client components.
// Used to replace emoji feature-card icons (brand rule: no emojis anywhere).

const PATHS: Record<string, React.ReactNode> = {
  // two loop arrows (recurring)
  repeat: (
    <>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  // map pin (route / location)
  'map-pin': (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  // camera (before/after photos)
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  // droplet (water)
  droplet: (
    <>
      <path d="M12 2.7l5.4 5.4a7.6 7.6 0 1 1-10.8 0z" />
    </>
  ),
  // ruler (measure)
  ruler: (
    <>
      <path d="M16 2l6 6L8 22l-6-6z" />
      <path d="M7.5 10.5l2 2" />
      <path d="M10.5 7.5l2 2" />
      <path d="M13.5 4.5l2 2" />
      <path d="M4.5 13.5l2 2" />
    </>
  ),
  // message-square (communication)
  message: (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </>
  ),
  // clipboard (agreements / notes)
  clipboard: (
    <>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </>
  ),
  // sprout (plant / lawn)
  sprout: (
    <>
      <path d="M12 22V11" />
      <path d="M12 11C12 7 9 4 4 4c0 5 3 8 8 8z" />
      <path d="M12 11c0-3 3-6 8-6 0 4-3 7-8 7z" />
    </>
  ),
  // sun (solar)
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.9 4.9l1.4 1.4" />
      <path d="M17.7 17.7l1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.9 19.1l1.4-1.4" />
      <path d="M17.7 6.3l1.4-1.4" />
    </>
  ),
  // car (auto)
  car: (
    <>
      <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7" cy="16" r="1" />
      <circle cx="17" cy="16" r="1" />
    </>
  ),
  // spray bottle (product / chemical)
  spray: (
    <>
      <path d="M9 11h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
      <path d="M9 11V6a1 1 0 0 1 1-1h3" />
      <path d="M13 5V3" />
      <path d="M13 4l4 1" />
      <path d="M19 6h2" />
      <path d="M19 9h2" />
      <path d="M20 4l-1 2" />
    </>
  ),
  // alert triangle
  'alert-triangle': (
    <>
      <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  // check circle
  'check-circle': (
    <>
      <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
      <path d="M22 4L12 14.01l-3-3" />
    </>
  ),
  // lightbulb
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
    </>
  ),
  // route
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M9 19h6a4 4 0 0 0 4-4V8" />
      <path d="M15 5H9a4 4 0 0 0-4 4v7" />
    </>
  ),
  // users
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 3.1A4 4 0 0 1 16 11" />
    </>
  ),
}

export default function FeatureIcon({ name, size = 28 }: { name: string; size?: number }) {
  const inner = PATHS[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {inner ?? <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />}
    </svg>
  )
}
