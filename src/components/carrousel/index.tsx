import './index.css'
export default function Carrousel ({ images }: { images: Array<{ secureUrl: string; publicId?: string; }> }) {
  images
  return (
    <picture
    className="carrousel"
    >
      {/* {
        images.map((image, index) => <img src={image.secureUrl} alt={`Post image ${index}`} key={index}  />)
      } */}
    </picture>
  )
}