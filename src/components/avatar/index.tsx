import './index.css'

export default function Avatar ({ src, alt, isVerified, w, h }: { src: string; alt: string; isVerified: boolean; w?: number; h?: number; }) {
  return (
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        className='avatar'
        style={{
          borderColor: isVerified ? 'var(--color_accent)' : ''
        }}
      />
  )
}