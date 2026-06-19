import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#101010',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-title)',
        fontSize: 'clamp(8rem, 25vw, 20rem)',
        fontWeight: 400,
        color: '#EEE9F3',
        lineHeight: 1,
        letterSpacing: 0,
        textTransform: 'uppercase',
        margin: 0,
      }}>
        404
      </h1>

      <p style={{
        fontFamily: 'var(--font)',
        fontSize: 18,
        fontWeight: 400,
        color: '#9491a1',
        margin: 0,
        maxWidth: 400,
        lineHeight: 1.6,
      }}>
        Cette page n'existe pas ou a été déplacée.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          background: '#EEE9F3',
          border: 'none',
          borderRadius: 12,
          paddingLeft: 24,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          textDecoration: 'none',
          marginTop: 8,
        }}
      >
        <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#101010', lineHeight: 1 }}>
          Retour à l'accueil
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: '#A122E2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </Link>
    </div>
  )
}
