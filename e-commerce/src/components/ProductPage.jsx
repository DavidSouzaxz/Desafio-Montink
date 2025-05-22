import React, { useState, useEffect } from 'react'
import './css/ProductPage.css'
import ProductGallery from './ProductGallery.jsx'
import VariantSelector from './VariantSelector.jsx'
import DeliveryChecker from './DeliveryChecker.jsx'

const product = {
  title: 'Tenis espotivos xyz',
  price: 299.90,
  images: [
    './src/assets/img1.jpg',
    './src/assets/img2.jpg',
    './src/assets/img3.jpg',
    './src/assets/img4.jpg'
  ],
  variants: {
    sizes: ['38', '39', '40', '41'],
    colors: ['preto', 'branco', 'azul']
  }
}

const STORAGE_KEY = 'ecommerce-product-data'

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [delivery, setDelivery] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && Date.now() - saved.timestamp < 15 * 60 * 1000) {
      setMainImage(saved.mainImage || product.images[0])
      setSelectedSize(saved.selectedSize)
      setSelectedColor(saved.selectedColor)
      setDelivery(saved.delivery)
    }
  }, [])

  useEffect(() => {
    const data = {
      mainImage,
      selectedSize,
      selectedColor,
      delivery,
      timestamp: Date.now()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [mainImage, selectedSize, selectedColor, delivery])

  return (
    <div className="bg-white rounded shadow-md px-10 py-8 max-w-6xl mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-10">e-commerce</h1>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        <ProductGallery
          images={product.images}
          mainImage={mainImage}
          onImageClick={setMainImage}
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-xl text-green-600 mt-2">R$ {product.price.toFixed(2)}</p>

          <VariantSelector
            label="Tamanho"
            options={product.variants.sizes}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />

          <VariantSelector
            label="Cor"
            options={product.variants.colors}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />

          <DeliveryChecker delivery={delivery} setDelivery={setDelivery} />
        </div>
      </div>
    </div>
  )
}