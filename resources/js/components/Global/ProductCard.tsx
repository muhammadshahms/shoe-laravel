"use client"

import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface ProductCardProps {
  title: string
  price: string
  originalPrice?: string
  rating: number
  reviews: string
  image: string
  onViewDetails?: () => void
  onAddToCart?: () => void
  className?: string
  showDiscount?: boolean
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  onViewDetails,
  onAddToCart,
  className = "",
  showDiscount = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.4 }}
      className={`group relative ${className}`}
    >
      {/* Glass Effect Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Product Image */}
        <div className="relative mb-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-4 backdrop-blur-sm">
            <motion.img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-48 object-contain drop-shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            ⭐ {rating} ({reviews})
          </div>

          {/* Discount Badge */}
          {showDiscount && originalPrice && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              25% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            className="absolute bottom-3 left-3 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isWishlisted ? "text-red-400 fill-red-400" : "text-white"}`}
            />
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="relative z-10">
          <h4 className="text-white text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
            {title}
          </h4>

          <div className="flex items-center gap-3 mb-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {price}
            </p>
            {originalPrice && <p className="text-lg text-gray-400 line-through">{originalPrice}</p>}
          </div>

          <p className="text-gray-400 text-sm mb-3">Premium Collection 2024</p>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-gray-400 text-sm ml-2">({reviews})</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
              onClick={onViewDetails}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm bg-transparent"
              onClick={onAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      </div>
    </motion.div>
  )
}
