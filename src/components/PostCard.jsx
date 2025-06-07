import React, { useState, useRef } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostCard({ $id, title, featuredImage }) {
  const userData = useSelector((state) => state.auth.userData)
  const cardRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState({})

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left // Mouse X relative to card
    const y = e.clientY - rect.top  // Mouse Y relative to card

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    // Multiply by max rotation degrees, smaller for subtle effect
    const rotateX = deltaY * 7 // Tilt around X axis (vertical movement)
    const rotateY = deltaX * -7 // Tilt around Y axis (horizontal movement)

    setTransformStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform',
    })
  }

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.4s ease-in-out',
    })
  }

  return (
    <Link to={`/post/${$id}`} className="block">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full bg-gray-800 rounded-2xl p-5 shadow-md cursor-pointer"
        style={transformStyle}
      >
        <div className="w-full mb-5 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-48 object-cover rounded-xl"
            loading="lazy"
          />
        </div>
        <h2 className="text-xl font-semibold text-white truncate">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
