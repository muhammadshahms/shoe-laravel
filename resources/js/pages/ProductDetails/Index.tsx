"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/Global/Header"
import ProductCard from "@/components/Global/ProductCard"
import Footer from "@/components/Global/Footer"

// Product data
// const product = {
//   id: 1,
//   title: "Nike Air Max 270 React",
//   price: "$210",
//   originalPrice: "$280",
//   rating: 4.9,
//   reviews: "2.5k+",
//   description:
//     "The Nike Air Max 270 React combines two of Nike's most innovative technologies for unparalleled comfort and style. Featuring the largest heel Air unit in Nike history and React foam technology.",
//   images: ["/3.png", "/1.png", "/2.png", "/4.png"],
//   colors: ["Black", "White", "Blue", "Red"],
//   sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
//   features: [
//     "Air Max 270 unit for maximum comfort",
//     "React foam midsole for responsive cushioning",
//     "Breathable mesh upper",
//     "Rubber outsole for durability",
//   ],
//   specifications: {
//     Brand: "Nike",
//     Model: "Air Max 270 React",
//     Category: "Running Shoes",
//     Material: "Mesh, Synthetic",
//     Sole: "Rubber",
//     Weight: "320g",
//   },
// }
interface Product {
  id: number
  name: string
  slug: string
  price: number
  special_price?: number
  description?: string
  brand?: { name: string }
  categories?: { name: string }[]
}

interface ProductDetailProps {
  product: Product
  mainImage: string
  gallery: string[]
}
const relatedProducts = [
  {
    title: "Nike Air Force 1",
    price: "$190",
    originalPrice: "$240",
    rating: 4.8,
    reviews: "1.8k+",
    image: "/1.png",
  },
  {
    title: "Nike React Infinity",
    price: "$160",
    originalPrice: "$200",
    rating: 4.7,
    reviews: "950+",
    image: "/2.png",
  },
  {
    title: "Nike Zoom Pegasus",
    price: "$120",
    originalPrice: "$150",
    rating: 4.6,
    reviews: "1.2k+",
    image: "/4.png",
  },
]

const reviews = [
  {
    name: "Alex Johnson",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing comfort and style! Perfect for daily wear and running.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Sarah Wilson",
    rating: 5,
    date: "1 week ago",
    comment: "Love the design and the Air Max cushioning is incredible.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Mike Chen",
    rating: 4,
    date: "2 weeks ago",
    comment: "Great shoes, very comfortable. Sizing runs a bit large.",
    avatar: "/placeholder-user.jpg",
  },
]

export default function ProductDetailPage({ product, mainImage, gallery }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Black")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <>
      <div className="text-white min-h-screen font-sans bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <Header />
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            className="py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 w-fit">
              <span className="text-gray-400">Home</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400">Shoes</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="text-yellow-400 font-medium">Nike Air Max 270 React</span>
            </div>
          </motion.div>

          {/* Product Detail Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-8">
            {/* Product Images */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-96 flex items-center justify-center overflow-hidden shadow-2xl">
                <motion.img
                  key={selectedImage}
                  src={gallery[selectedImage] || mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                />
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-black transition-all duration-300"
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : gallery.length - 1)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-black transition-all duration-300"
                  onClick={() => setSelectedImage(selectedImage < gallery.length - 1 ? selectedImage + 1 : 0)}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <motion.div
                  className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full backdrop-blur-sm border border-yellow-400/30"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                {gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-3 border-2 transition-all duration-300 ${selectedImage === index
                      ? "border-yellow-400 shadow-lg shadow-yellow-400/25"
                      : "border-white/20 hover:border-white/40"
                      }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={image || "/placeholder.svg"} alt={`Product ${index + 1}`} className="w-full h-full object-contain" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-transparent backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400 font-medium">Premium Collection</span>
              </motion.div>

              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl">
                <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {product.special_price ?? product.price}
                </span>
                {product.special_price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">{product.price}</span>
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1">SALE</Badge>
                  </>
                )}
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <motion.button
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                  <motion.button
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                    onClick={() => setQuantity(quantity + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className={`h-14 w-14 border-white/20 rounded-xl backdrop-blur-sm bg-white/5 transition-all duration-300 ${isWishlisted ? "text-red-500 border-red-500" : "text-white hover:text-red-500"
                    }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} />
                </Button>
                <Button
                  variant="outline"
                  className="h-14 w-14 border-white/20 text-white bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Feature icon={<Truck className="w-6 h-6 text-yellow-400" />} label="Free Shipping" />
                <Feature icon={<Shield className="w-6 h-6 text-yellow-400" />} label="2 Year Warranty" />
                <Feature icon={<RotateCcw className="w-6 h-6 text-yellow-400" />} label="30 Day Returns" />
              </div>
            </motion.div>
          </section>

          {/* Product Details Tabs */}
          <section className="py-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                Product Details
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need to know about this premium product
              </p>
            </motion.div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="flex justify-center flex-wrap gap-4 mb-8 bg-transparent border-none">
                <TabsTrigger
                  value="description"
                  className="uppercase text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-black border border-white/20 px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-white/5"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="uppercase text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-black border border-white/20 px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-white/5"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="uppercase text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-black border border-white/20 px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-white/5"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8">
                    Product Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-300 mb-8 leading-relaxed text-lg">{product.description}</p>
                      {/* <div className="space-y-4">
                        {product.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                      </div> */}
                    </div>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                      <motion.img
                        src="/3.png"
                        alt="Product Feature"
                        className="w-full h-64 object-contain drop-shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="specifications">
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8">
                    Technical Specifications
                  </h3>
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center py-4 px-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-gray-400 font-medium">{key}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </motion.div>
                    ))}
                  </div> */}
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews">
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      Customer Reviews
                    </h3>
                    <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 font-semibold px-6 py-3 rounded-xl">
                      Write Review
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={index}
                        className="border-b border-white/10 pb-6 last:border-b-0 p-6 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14 border-2 border-white/20">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold">
                              {review.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h4 className="font-semibold text-white text-lg">{review.name}</h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Related Products */}
          <section className="">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                Related Products
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover more amazing products from our premium collection
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {relatedProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  image={product.image}
                  showDiscount={true}
                  onViewDetails={() => console.log("View details:", product.title)}
                  onAddToCart={() => console.log("Add to cart:", product.title)}
                />
              ))}
            </motion.div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}
function Feature({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-center"
      whileHover={{ scale: 1.02 }}
    >
      {icon}
      <span className="text-sm text-gray-300 font-medium">{label}</span>
    </motion.div>
  )
}