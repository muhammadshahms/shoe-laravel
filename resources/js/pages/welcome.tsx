"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Sparkles, TrendingUp, Award, HeartIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useState } from "react"
import Header from "@/components/Global/Header"
import Footer from "@/components/Global/Footer"

type Product = {
  title: string
  price: string
  rating: number
  reviews: string
  image: string
}

type ProductsByCategory = Record<string, Product[]>

const categories = ["All", "Boots", "Shoes", "Sandals", "Slipper", "Jogging"]

const allProducts: ProductsByCategory = {
  All: [
    {
      title: "Nike Running Pro",
      price: "$210",
      rating: 4.9,
      reviews: "200k+",
      image: "/1.png",
    },
    {
      title: "Nike Air Max Elite",
      price: "$190",
      rating: 4.8,
      reviews: "150k+",
      image: "/2.png",
    },
    {
      title: "Nike Air Max Sport",
      price: "$185",
      rating: 4.7,
      reviews: "120k+",
      image: "/2.png",
    },
    {
      title: "Nike Air Max Classic",
      price: "$175",
      rating: 4.6,
      reviews: "95k+",
      image: "/2.png",
    },
    {
      title: "Nike Performance",
      price: "$220",
      rating: 4.9,
      reviews: "180k+",
      image: "/1.png",
    },
    {
      title: "Nike Street Style",
      price: "$165",
      rating: 4.5,
      reviews: "85k+",
      image: "/3.png",
    },
  ],
  Boots: [
    {
      title: "Nike Trail Runner",
      price: "$210",
      rating: 4.9,
      reviews: "200k+",
      image: "/1.png",
    },
    {
      title: "Nike Outdoor Max",
      price: "$190",
      rating: 4.8,
      reviews: "150k+",
      image: "/2.png",
    },
  ],
  Shoes: [
    {
      title: "Nike Casual Wear",
      price: "$155",
      rating: 4.6,
      reviews: "75k+",
      image: "/3.png",
    },
  ],
  Sandals: [
    {
      title: "Nike Summer Slide",
      price: "$85",
      rating: 4.4,
      reviews: "45k+",
      image: "/4.png",
    },
  ],
  Slipper: [
    {
      title: "Nike Comfort Slip",
      price: "$65",
      rating: 4.3,
      reviews: "35k+",
      image: "/4.png",
    },
  ],
  Jogging: [
    {
      title: "Nike Marathon Pro",
      price: "$245",
      rating: 4.9,
      reviews: "250k+",
      image: "/1.png",
    },
  ],
}

export default function AllRunPage() {
  const productsPerPage = 6
  const [currentPages, setCurrentPages] = useState(Object.fromEntries(categories.map((cat) => [cat, 0])))
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const setCurrentPage = (cat: any, page: any) => {
    setCurrentPages((prev: any) => ({
      ...prev,
      [cat]: page,
    }))
  }

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
          {/* Hero Section */}
          <section className="px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center relative overflow-hidden">
            {/* Text Content */}
            <motion.div
              className="z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-transparent backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400 font-medium">New Collection 2024</span>
              </motion.div>

              <h2 className="text-6xl font-extrabold text-white leading-tight mb-6">
                Summer{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Collections
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mt-4 max-w-md mb-8">
                Feel the difference of next-level comfort as you go head-to-head against some of the toughest terrains
                around.
              </p>

              <div className="flex gap-4 mb-12">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-xl hover:from-yellow-300 hover:to-orange-300 font-semibold shadow-lg hover:shadow-yellow-400/25 transition-all duration-300">
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white/20 text-white px-8 py-3 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 bg-transparent"
                >
                  View Collection
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <p className="text-3xl font-bold text-cyan-400">90K+</p>
                  </div>
                  <p className="text-gray-400 text-sm">Collections</p>
                </motion.div>

                <motion.div
                  className="text-center border-l border-r border-gray-700 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-pink-500" />
                    <p className="text-3xl font-bold text-pink-500">100K+</p>
                  </div>
                  <p className="text-gray-400 text-sm">Happy Users</p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xl font-bold text-white">4.9</p>
                  </div>
                  <p className="text-gray-400 text-sm">200k+ Reviews</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1
                className="absolute inset-0 flex items-center justify-center text-[14rem] font-extrabold text-transparent select-none z-0"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)", opacity: 0.5 }}
              >
                NIKE
              </h1>
              <motion.img
                src="/3.png"
                alt="Nike Shoe"
                className="w-full max-w-lg mx-auto relative z-10 drop-shadow-2xl"
                initial={{ scale: 0.9, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: 3, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {/* Floating elements */}
              <motion.div
                className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full backdrop-blur-sm border border-yellow-400/30"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full backdrop-blur-sm border border-cyan-400/30"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>
          </section>

          {/* About Section */}
          <section className="px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
            {/* Shoe Image */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 w-80 h-80 rounded-3xl relative z-0 shadow-2xl"></div>
              <motion.img
                src="/4.png"
                alt="Blue Shoe"
                className="absolute w-[300px] -top-10 z-10 drop-shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">us</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                We're passionate about delivering premium footwear that combines cutting-edge technology with timeless
                style. Every step you take is a step towards excellence.
              </p>

              {/* Enhanced Feature Boxes */}
              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Premium Quality</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Crafted with the finest materials and cutting-edge technology for unmatched durability and
                      comfort.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Best Value</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Competitive pricing without compromising on quality. Get the best value for your investment.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Category Tabs */}
          <section className="px-4 py-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                Our Categories
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover our extensive collection of premium footwear designed for every occasion and lifestyle.
              </p>
            </motion.div>

            <Tabs defaultValue="All" className="w-full">
              <TabsList className="flex justify-center flex-wrap gap-4 mb-8 bg-transparent border-none">
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <TabsTrigger
                      value={cat}
                      className="uppercase text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-black border border-gray-700 px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    >
                      {cat}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>

              {categories.map((cat) => {
                const allCatProducts = allProducts[cat] || []
                const currentPage = currentPages[cat] || 0
                const totalPages = Math.ceil(allCatProducts.length / productsPerPage)
                const paginatedProducts = allCatProducts.slice(
                  currentPage * productsPerPage,
                  currentPage * productsPerPage + productsPerPage,
                )

                return (
                  <TabsContent key={cat} value={cat}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {paginatedProducts.map((product, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05, y: -10 }}
                          transition={{ duration: 0.4 }}
                          className="group relative"
                        >
                          {/* Glass Effect Card */}
                          <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 overflow-hidden">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Product Image */}
                            <div className="relative mb-6">
                              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-4 backdrop-blur-sm">
                                <motion.img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.title}
                                  className="w-full h-48 object-contain drop-shadow-lg"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                              </div>

                              {/* Rating Badge */}
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                ⭐ {product.rating} ({product.reviews})
                              </div>

                              {/* Wishlist Button */}
                              <motion.button
                                className="absolute top-3 left-3 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2 }}
                                  className="text-white hover:text-red-400 transition-colors"
                                >
                                  <HeartIcon className="w-4 h-4 text-gray-400" />
                                </motion.div>
                              </motion.button>
                            </div>

                            {/* Product Info */}
                            <div className="relative z-10">
                              <h4 className="text-white text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                                {product.title}
                              </h4>
                              <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                                {product.price}
                              </p>
                              <p className="text-gray-400 text-sm mb-3">Premium Collection 2024</p>

                              {/* Star Rating */}
                              <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, idx) => (
                                  <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-gray-400 text-sm ml-2">({product.reviews})</span>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-3">
                                <Button
                                  className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                                  onClick={() => setSelectedProduct(product)}
                                >
                                  View Details
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="border-white/20 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm bg-transparent"
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
                      ))}
                    </motion.div>

                    {totalPages > 1 && (
                      <motion.div
                        className="flex justify-center items-center gap-4 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-black transition-all duration-300"
                          onClick={() => setCurrentPage(cat, Math.max(currentPage - 1, 0))}
                          disabled={currentPage === 0}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentPage
                                ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                                : "bg-white/20 hover:bg-white/40"
                                }`}
                              onClick={() => setCurrentPage(cat, i)}
                            />
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-black transition-all duration-300"
                          onClick={() => setCurrentPage(cat, Math.min(currentPage + 1, totalPages - 1))}
                          disabled={currentPage === totalPages - 1}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          </section>

          {/* Popular Products Section */}
          <section className="px-4 py-20">
            <motion.h3
              className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Products
            </motion.h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Features */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-3xl font-bold text-white mb-8">Unique Features Of Latest & Trending Products</h4>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Advanced cushioning technology with premium materials for maximum comfort and durability
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Breathable mesh construction with moisture-wicking properties for all-day comfort
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">
                      Ergonomic design with superior arch support and shock absorption technology
                    </p>
                  </motion.div>
                </div>

                <div className="flex items-center gap-6 mt-10 p-6 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-sm border border-yellow-400/20">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 hover:from-yellow-300 hover:to-orange-300 font-semibold rounded-xl shadow-lg">
                    Shop Now
                  </Button>
                  <div className="text-white">
                    <span className="text-xl font-bold">Nike Air Max Pro</span>
                    <br />
                    <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      $210.00
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Product Showcase */}
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Left sidebar with small shoe images */}
                <div className="absolute left-6 top-8 flex flex-col gap-4 z-10">
                  {["/1.png", "/2.png", "/3.png", "/4.png"].map((img, index) => (
                    <motion.div
                      key={index}
                      className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Shoe ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Main product area */}
                <div className="bg-gradient-to-br from-teal-600/80 to-teal-800/80 backdrop-blur-sm rounded-3xl p-8 ml-20 relative overflow-hidden min-h-[400px] border border-teal-400/20">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-transparent"></div>

                  {/* Main shoe image */}
                  <div className="flex justify-center items-center h-48 mb-8">
                    <motion.img
                      src="/3.png"
                      alt="Nike Running Shoe"
                      className="w-64 h-auto object-contain drop-shadow-2xl"
                      initial={{ scale: 0.9, rotate: -5 }}
                      whileHover={{ scale: 1.1, rotate: 5, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col items-center gap-3 text-white">
                    <h4 className="text-2xl font-bold">Nike Air Max Pro</h4>
                    <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      $210
                    </p>
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg font-semibold border-r border-white/30 pr-3">4.9</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">(2.5k+ reviews)</span>
                      </div>
                    </div>
                    {/* Buy Now Button */}
                    <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black w-full hover:from-yellow-300 hover:to-orange-300 font-semibold py-3 rounded-xl shadow-lg">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}
