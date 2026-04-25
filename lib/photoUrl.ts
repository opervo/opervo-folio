// job_photos.url stores a Supabase Storage path like
//   "<user_id>/<job_id>/<file>.jpg"
// not a fully-qualified URL. Build the public URL here so the folio
// renderer can drop it straight into <img src>.

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://sbnykmxckfwkkxvhrkot.supabase.co'

const JOB_PHOTOS_BUCKET = 'job-photos'

export function jobPhotoPublicUrl(rawUrl: string): string {
  if (!rawUrl) return ''
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl
  const cleanPath = rawUrl.replace(/^\/+/, '')
  return `${SUPABASE_URL}/storage/v1/object/public/${JOB_PHOTOS_BUCKET}/${cleanPath}`
}
