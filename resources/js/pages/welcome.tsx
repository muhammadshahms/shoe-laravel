import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// @ts-nocheck
type Product = {
  title: string;
  price: string;
  rating: number;
  reviews: string;
  image: string;
};

type ProductsByCategory = Record<string, Product[]>;
const categories = ["All", "Boots", "Shoes", "Sandals", "Slipper", "Jogging"];
const allProducts: ProductsByCategory = {
  All: [
    {
      title: "Nike Running",
      price: "$210",
      rating: 4.9,
      reviews: "200k+",
      image: "/1.png",
    },
    {
      title: "Nike Air Max",
      price: "$190",
      rating: 4.8,
      reviews: "150k+",
      image: "/2.png",
    },
    {
      title: "Nike Air Max",
      price: "$190",
      rating: 4.8,
      reviews: "150k+",
      image: "/2.png",
    },
    {
      title: "Nike Air Max",
      price: "$190",
      rating: 4.8,
      reviews: "150k+",
      image: "/2.png",
    },
  ],
  Boots: [
    {
      title: "Nike Running",
      price: "$210",
      rating: 4.9,
      reviews: "200k+",
      image: "/1.png",
    },
    {
      title: "Nike Air Max",
      price: "$190",
      rating: 4.8,
      reviews: "150k+",
      image: "/2.png",
    },
  ],
  Shoes: [],
  Sandals: [],
  Slipper: [],
  Jogging: [],
};

export default function AllRunPage() {
  const productsPerPage = 3;
  const [currentPages, setCurrentPages] = useState(
    Object.fromEntries(categories.map((cat) => [cat, 0]))
  );
  const [_selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const setCurrentPage = (cat: any, page: any) => {
    setCurrentPages((prev: any) => ({
      ...prev,
      [cat]: page,
    }));
  };

  return (
    <div className=" text-white min-h-screen font-sans bg bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="sticky top-3 z-50 flex justify-between items-center px-8 py-5 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-400">AllRun</h1>
          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="#" className="hover:text-yellow-400">Home</a>
            <a href="#" className="hover:text-yellow-400">About Us</a>
            <a href="#" className="hover:text-yellow-400">Category</a>
          </nav>

          <div className="flex items-center space-x-4">
            <ShoppingCart />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          </div>
        </header>


        {/* Hero Section */}
        <section className="px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center relative overflow-hidden">
          {/* Text Content */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              Summer <span className="text-yellow-400">Collections</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-md">
              Feel the difference of next-level comfort as you go head-to-head against some of the toughest terrains around.
            </p>
            <Button className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-300">
              Buy Now
            </Button>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              <div>
                <p className="text-3xl font-bold text-cyan-400">90K+</p>
                <p className="text-gray-400 text-sm">Collections</p>
              </div>
              <div className="border-l border-gray-700 pl-4">
                <p className="text-3xl font-bold text-pink-500">100K+</p>
                <p className="text-gray-400 text-sm">Users</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-xl font-bold text-white ">4.9</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">200k+ Total Review</span>
              </div>
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
              style={{ WebkitTextStroke: '2px white', opacity: 0.25 }}
            >
              NIKE
            </h1>

            <motion.img
              src="/3.png"
              alt="Nike Shoe"
              className="w-full max-w-lg mx-auto relative z-10"
              initial={{ scale: 0.9, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 3, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </section>



        <section className="px-4  py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          {/* Shoe Image */}
          <div className="relative flex justify-center">
            <div className="bg-[#255b5a] w-80 h-80 rounded-xl relative z-0"></div>
            <img
              src="/4.png" // Replace with your uploaded shoe path
              alt="Blue Shoe"
              className="absolute w-[300px] -top-10 z-10"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              About <span className="text-yellow-400">us</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.
            </p>

            {/* Feature Box 1 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-md">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 17l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Best Quality Shoes</h4>
                <p className="text-gray-400 text-sm">Minim nostrud duis cillum amet nulla et aliqua dolor do amet sint.</p>
              </div>
            </div>

            {/* Feature Box 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-md">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 2c1.79 0 3.44.586 4.79 1.57L4.57 16.79A9.003 9.003 0 0112 3zm0 18c-1.79 0-3.44-.586-4.79-1.57L19.43 7.21A9.003 9.003 0 0112 21z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Best Pricing</h4>
                <p className="text-gray-400 text-sm">Deserunt ullamco est sit aliqua minim mollit non dolor do amet sint.</p>
              </div>
            </div>
          </div>
        </section>




        {/* Category Tabs */}
        <section className="px-4 py-20">
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">Categories</h3>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="flex justify-center flex-wrap gap-4 mb-6 bg-transparent border-none">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="uppercase text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black border border-gray-700"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => {
              const allCatProducts = allProducts[cat] || [];
              const currentPage = currentPages[cat] || 0;
              const totalPages = Math.ceil(allCatProducts.length / productsPerPage);
              const paginatedProducts = allCatProducts.slice(
                currentPage * productsPerPage,
                currentPage * productsPerPage + productsPerPage
              );

              return (
                <TabsContent key={cat} value={cat}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {paginatedProducts.map((product, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-xl border border-gray-700 bg-[#1e1e1e] p-4"
                      >
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain mb-4"
                          />
                          <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs">
                            {product.rating}
                            <span className="text-gray-800">({product.reviews})</span>
                          </div>
                        </div>
                        <h4 className="text-white text-lg font-semibold mb-1">{product.title}</h4>
                        <p className="text-yellow-400 text-sm mb-2">{product.price}</p>
                        <p className="text-gray-500 text-xs mb-1">
                          Running Nike - Collection 2022
                        </p>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm mb-4">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="h-4 w-4 fill-yellow-400" />
                          ))}
                        </div>
                        <Button
                          className="bg-yellow-400 text-black w-full hover:bg-yellow-300"
                          onClick={() => setSelectedProduct(product)}
                        >
                          View Details
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-gray-800 text-white hover:bg-yellow-400 hover:text-black"
                        onClick={() => setCurrentPage(cat, Math.max(currentPage - 1, 0))}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-gray-800 text-white hover:bg-yellow-400 hover:text-black"
                        onClick={() => setCurrentPage(cat, Math.min(currentPage + 1, totalPages - 1))}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </section>
        {/* Popular Products Section */}
        <section className="px-4 py-20">
          <h3 className="text-3xl font-bold text-yellow-400">Popular Products</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Features */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6">
                Unique Features Of Latest & Trending Products
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">All frames constructed with hardwood solids and laminates</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Reinforced with double wood dowels, glue, screw-nails corner blocks and machine nails</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Arms, backs and seats are structurally reinforced</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <Button className="bg-yellow-400 text-black px-6 py-2 hover:bg-yellow-300">
                  Buy Now
                </Button>
                <div className="text-white">
                  <span className="text-lg font-bold">B&amp;B Italian Sofa</span>
                  <br />
                  <span className="text-yellow-400 text-sm">$32.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-400">1/10</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center hover:bg-yellow-300 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Product Showcase */}
            <div className="relative bg-gray-700 rounded-2xl p-6">
              {/* Left sidebar with small shoe images */}
              <div className="absolute left-4 top-6 flex flex-col gap-3">
                <div className="w-12 h-12 bg-gray-600 rounded-lg p-2">
                  <img src="/1.png" alt="Shoe 1" className="w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 bg-gray-600 rounded-lg p-2">
                  <img src="/2.png" alt="Shoe 2" className="w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 bg-gray-600 rounded-lg p-2">
                  <img src="/3.png" alt="Shoe 3" className="w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 bg-gray-600 rounded-lg p-2">
                  <img src="/4.png" alt="Shoe 4" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Main product area */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 ml-16 relative overflow-hidden min-h-[400px]">
                {/* Main shoe image */}
                <div className="flex justify-center items-center h-48 mb-6">
                  <motion.img
                    src="/3.png"
                    alt="Nike Running Shoe"
                    className="w-64 h-auto object-contain"
                    initial={{ scale: 0.9, rotate: -5 }}
                    whileHover={{ scale: 1.05, rotate: 5, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>

                {/* Product info */}
                <div className="flex flex-col items-end gap-1 text-white">
                  <h4 className="text-xl font-bold">Nike Running</h4>
                  <p className="text-2xl font-bold">$210</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold border-r border-slate-400 px-2">4.9</span>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

                  </div>
                  {/* Buy Now Button */}
                  <Button className="bg-yellow-400 text-black w-full hover:bg-yellow-300">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 p-10 mt-10 text-sm">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">AllRun</h4>
              <p className="mb-1">Experience the best comfort in every step</p>
              <p>New York, NY</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Company</h4>
              <p>About</p>
              <p>Careers</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Support</h4>
              <p>Contact</p>
              <p>Help Center</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
