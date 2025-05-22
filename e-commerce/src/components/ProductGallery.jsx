import './css/ProductGallery.css'

export default function ProductGallery({ images, mainImage, onImageClick }) {
  return (
    <div className="w-full md:w-[35%]">
      <img src={mainImage} alt="Produto" className="rounded w-full h-auto" />
      <div className="flex gap-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index}`}
            className={`w-16 h-16 rounded object-cover cursor-pointer border ${
              img === mainImage ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => onImageClick(img)}
          />
        ))}
      </div>
    </div>
  )
}