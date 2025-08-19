"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Sparkles, TrendingUp, Award, HeartIcon, Heart } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Header from "@/components/Global/Header"
import Footer from "@/components/Global/Footer"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import UserLayout from "@/layouts/user-layout"
import SliderBanner from "@/components/SliderBanner"
import SimpleBanner from "@/components/SimpleBanner"
// import FeaturedBanner from "@/components/Banner"

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

export default function AllRunPage({ sliderBanners, simpleBanners }: any) {
  const productsPerPage = 6
  const [currentPages, setCurrentPages] = useState(Object.fromEntries(categories.map((cat) => [cat, 0])))
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const [currentSlides, setCurrentSlides] = useState({})

  // Initialize current slides for each category
  useEffect(() => {
    const initialSlides = {}
    categories.forEach(cat => {
      initialSlides[cat] = 0
    })
    setCurrentSlides(initialSlides)
  }, [])

  const nextSlide = (category) => {
    const products = allProducts[category] || []
    const maxSlide = Math.max(0, products.length - getVisibleItems())
    setCurrentSlides(prev => ({
      ...prev,
      [category]: Math.min((prev[category] || 0) + 1, maxSlide)
    }))
  }

  const prevSlide = (category) => {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: Math.max((prev[category] || 0) - 1, 0)
    }))
  }

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3 // lg screens
      if (window.innerWidth >= 768) return 2  // md screens
      return 1 // sm screens
    }
    return 3
  }

  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const setCurrentPage = (cat: any, page: any) => {
    setCurrentPages((prev: any) => ({
      ...prev,
      [cat]: page,
    }))
  }

  return (
    <>
      <UserLayout>
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
          <Tabs defaultValue="All" className="w-full max-w-7xl">
            <TabsList className="flex justify-center flex-wrap gap-4 mb-12 bg-transparent border-none">
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
              const products = allProducts[cat] || []
              const currentSlide = currentSlides[cat] || 0
              const maxSlide = Math.max(0, products.length - visibleItems)

              return (
                <TabsContent key={cat} value={cat}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative"
                  >
                    {/* Shadcn Carousel */}
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {products.map((product, i) => (
                          <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                            <motion.div
                              className="group relative h-full"
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05, y: -10 }}
                              transition={{ duration: 0.4 }}
                            >
                              {/* Glass Effect Card */}
                              <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 overflow-hidden h-full">
                                {/* Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Product Image */}
                                <div className="relative mb-6">
                                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-4 backdrop-blur-sm">
                                    <motion.img
                                      src={product.image}
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
                                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors" />
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
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      {/* Custom styled navigation buttons */}
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-black transition-all duration-300" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-black transition-all duration-300" />
                    </Carousel>
                  </motion.div>
                </TabsContent>
              )
            })}
          </Tabs>
        </section>

        <SliderBanner banners={sliderBanners} />
        <SimpleBanner banners={simpleBanners} />

      </UserLayout>
    </>
  )
}
