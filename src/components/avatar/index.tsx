import { IconCheck } from '@tabler/icons-react';
import './index.css'


export default function Avatar ({ src, alt, isVerified, w, h }: { src: string; alt: string; isVerified: boolean; w?: number; h?: number; }) {
  return (
    <div className='avatar_container'>
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

      <IconCheck 
        className='check'
        style={{
          color: isVerified ? 'var(--color_accent)' : 'transparent'
        }}
      />
    </div>
  )
}