"use client"

import { usePage, router } from "@inertiajs/react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, X, ChevronDown, SlidersHorizontal, ArrowUpDown, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import Header from "@/components/Global/Header"
import ProductCard from "@/components/Global/ProductCard"
import Footer from "@/components/Global/Footer"
import LoadingOverlay from "@/components/ui/loading-overlay" // Import the new component
import { useDebounce } from "@/hooks/use-debounce"
import { useCart } from "@/hooks/use-cart" // Import the useCart hook
import { Toaster } from "sonner" // Import Toaster for toasts
import { CartSheet } from "@/components/CartSheet"
// import CartSheet from "@/components/cart-sheet" // Import the new CartSheet component

// Define types based on Laravel's Inertia props
interface Product {
  id: number
  name: string
  price: number
  special_price?: number
  rating?: number // Assuming a rating field
  reviews_count?: number // Assuming a reviews count field
  main_image_url: string
  is_active: boolean
  is_featured: boolean
  in_stock: boolean
  categories_list: string
}

interface Brand {
  id: number
  name: string
}

interface InertiaProps {
  products: {
    data: Product[]
    current_page: number
    last_page: number
    links: Array<{ url: string | null; label: string; active: boolean }>
    total: number
    from: number
    to: number
  }
  brands: Brand[]
  categories: string[] // Plucked names from Laravel
  filters: {
    search?: string
    category?: string
    brand?: string
    min_price?: number
    max_price?: number
    on_sale?: boolean
    featured?: boolean // Corresponds to is_featured
    in_stock?: boolean
    sort?: string
  }
}

export default function ShopPage() {
  const { products, brands, categories, filters } = usePage<InertiaProps>().props
  const { processing } = router as any
  const { addItem, cartItemCount } = useCart() // Use the cart hook
  const [isCartOpen, setIsCartOpen] = useState(false) // State for cart sheet

  const [currentFilters, setCurrentFilters] = useState({
    search: filters.search || "",
    category: filters.category || "All",
    brand: filters.brand || "All",
    min_price: filters.min_price ?? 0,
    max_price: filters.max_price ?? 300, // Default max price, adjust as needed
    on_sale: filters.on_sale || false,
    featured: filters.featured || false,
    in_stock: filters.in_stock || false,
    sort: filters.sort || "featured",
  })

  const debouncedSearchQuery = useDebounce(currentFilters.search, 500)

  // Effect to apply filters when currentFilters or debouncedSearchQuery changes
  useEffect(() => {
    const queryParams: Record<string, any> = {}
    if (debouncedSearchQuery) queryParams.search = debouncedSearchQuery
    if (currentFilters.category !== "All") queryParams.category = currentFilters.category
    if (currentFilters.brand !== "All") queryParams.brand = currentFilters.brand
    if (currentFilters.min_price !== 0) queryParams.min_price = currentFilters.min_price
    if (currentFilters.max_price !== 300) queryParams.max_price = currentFilters.max_price // Adjust default max
    if (currentFilters.on_sale) queryParams.on_sale = true
    if (currentFilters.featured) queryParams.featured = true
    if (currentFilters.in_stock) queryParams.in_stock = true
    if (currentFilters.sort !== "featured") queryParams.sort = currentFilters.sort

    // Use router.get to make an Inertia request to the current page path
    router.get(window.location.pathname, queryParams, {
      preserveState: true,
      preserveScroll: true,
      replace: true, // Replace history entry instead of pushing a new one
    })
  }, [
    debouncedSearchQuery,
    currentFilters.category,
    currentFilters.brand,
    currentFilters.min_price,
    currentFilters.max_price,
    currentFilters.on_sale,
    currentFilters.featured,
    currentFilters.in_stock,
    currentFilters.sort,
  ])

  const handleFilterChange = useCallback((key: string, value: any) => {
    if (key === "price_range") {
      setCurrentFilters((prev) => ({ ...prev, min_price: value[0], max_price: value[1] }))
    } else {
      setCurrentFilters((prev) => ({ ...prev, [key]: value }))
    }
  }, [])

  const clearFilters = () => {
    setCurrentFilters({
      search: "",
      category: "All",
      brand: "All",
      min_price: 0,
      max_price: 300, // Keep consistent default max
      on_sale: false,
      featured: false,
      in_stock: false,
      sort: "featured",
    })
  }

  const availableCategories = ["All", ...categories]
  const availableBrands = ["All", ...brands.map((b) => b.name)]
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "name", label: "Name (A-Z)" },
  ]

  const [searchOpen, setSearchOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid") // Keeping viewMode client-side
  const maxPrice = 300 // This should ideally come from backend props, e.g., `max_available_price`

  const formatPrice = (price: number | string | undefined): string => {
    if (typeof price === "number") {
      return price.toFixed(2)
    }
    if (typeof price === "string") {
      const numPrice = Number.parseFloat(price)
      return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2)
    }
    return "0.00"
  }

  const formatReviews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+`
    }
    return `${count}+`
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
          <section className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Filters */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl sticky top-8">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Filters</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10"
                          onClick={clearFilters}
                        >
                          <X className="w-4 h-4 mr-1 " />
                          Clear
                        </Button>
                      </div>
                      <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-6 pr-4">
                          {" "}
                          {/* Added pr-4 for scrollbar space */}
                          {/* Search */}
                          <div className="space-y-3">
                            <Label className="text-white font-medium">Search</Label>
                            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={searchOpen}
                                  className="w-full justify-start bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-zinc-300"
                                >
                                  <Search className="w-4 h-4 mr-2 text-gray-400 " />
                                  {currentFilters.search || "Search products..."}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700" align="start">
                                <Command>
                                  <CommandInput
                                    placeholder="Search products..."
                                    value={currentFilters.search}
                                    onValueChange={(value) => handleFilterChange("search", value)}
                                    className="text-white "
                                  />
                                  <CommandList>
                                    <CommandEmpty>No products found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                      {["Nike Air Max", "Running shoes", "Basketball shoes", "Lifestyle sneakers"]
                                        .filter((s) => s.toLowerCase().includes(currentFilters.search.toLowerCase()))
                                        .map((suggestion) => (
                                          <CommandItem
                                            key={suggestion}
                                            onSelect={() => {
                                              handleFilterChange("search", suggestion)
                                              setSearchOpen(false)
                                            }}
                                            className="text-white hover:bg-gray-700"
                                          >
                                            {suggestion}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <Separator className="bg-white/20" />
                          {/* Categories */}
                          <div className="space-y-3">
                            <Label className="text-white font-medium">Categories</Label>
                            <div className="space-y-2">
                              {availableCategories.map((category) => (
                                <Button
                                  key={category}
                                  variant={currentFilters.category === category ? "default" : "ghost"}
                                  className={`w-full justify-start ${currentFilters.category === category
                                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300"
                                    : "text-white hover:bg-white/10  hover:text-yellow-400"
                                    }`}
                                  onClick={() => handleFilterChange("category", category)}
                                >
                                  {category}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <Separator className="bg-white/20" />
                          {/* Brand Filter */}
                          <div className="space-y-3">
                            <Label className="text-white font-medium">Brand</Label>
                            <Select
                              value={currentFilters.brand}
                              onValueChange={(value) => handleFilterChange("brand", value)}
                            >
                              <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-yellow-400">
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                {availableBrands.map((brand) => (
                                  <SelectItem key={brand} value={brand} className="text-white hover:bg-gray-700">
                                    {brand}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Separator className="bg-white/20" />
                          {/* Price Range */}
                          <div className="space-y-3">
                            <Label className="text-white font-medium">
                              Price Range: {formatPrice(currentFilters.min_price)} -{" "}
                              {formatPrice(currentFilters.max_price)}
                            </Label>
                            <Slider
                              value={[currentFilters.min_price, currentFilters.max_price]}
                              onValueChange={(value) => handleFilterChange("price_range", value)}
                              max={maxPrice}
                              min={0}
                              step={10}
                              className="w-full"
                            />
                          </div>
                          <Separator className="bg-white/20" />
                          {/* Special Filters */}
                          <div className="space-y-4">
                            <Label className="text-white font-medium">Special Offers</Label>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="on-sale"
                                  checked={currentFilters.on_sale}
                                  onCheckedChange={(checked) => handleFilterChange("on_sale", checked)}
                                  className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                />
                                <Label htmlFor="on-sale" className="text-white cursor-pointer">
                                  On Sale
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="featured"
                                  checked={currentFilters.featured}
                                  onCheckedChange={(checked) => handleFilterChange("featured", checked)}
                                  className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                />
                                <Label htmlFor="featured" className="text-white cursor-pointer">
                                  Featured Products
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="in-stock"
                                  checked={currentFilters.in_stock}
                                  onCheckedChange={(checked) => handleFilterChange("in_stock", checked)}
                                  className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                />
                                <Label htmlFor="in-stock" className="text-white cursor-pointer">
                                  In Stock
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              {/* Right Content - Products */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  {/* Loading Overlay */}
                  {processing && <LoadingOverlay />}
                  {/* Top Controls */}
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl mb-8">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Results Summary */}
                        <div className="text-gray-300">
                          Showing <Badge className="bg-yellow-400/20 text-yellow-400">{products.data.length}</Badge> of{" "}
                          <Badge className="bg-yellow-400/20 text-yellow-400">{products.total}</Badge> products
                        </div>
                        {/* Controls */}
                        <div className="flex items-center gap-4">
                          {/* Sort Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 bg-white/5 hover:text-zinc-300"
                              >
                                <ArrowUpDown className="w-4 h-4 mr-2" />
                                Sort
                                <ChevronDown className="w-4 h-4 ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                              {sortOptions.map((option) => (
                                <DropdownMenuItem
                                  key={option.value}
                                  onClick={() => handleFilterChange("sort", option.value)}
                                  className="text-white hover:bg-gray-700"
                                >
                                  {option.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {/* Mobile Filters Sheet */}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="outline"
                                className="lg:hidden border-white/20 text-white hover:bg-white/10 bg-white/5"
                              >
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Filters
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="bg-gray-900 border-gray-700">
                              <SheetHeader>
                                <SheetTitle className="text-white">Filters</SheetTitle>
                                <SheetDescription className="text-gray-400">
                                  Refine your search to find the perfect products.
                                </SheetDescription>
                              </SheetHeader>
                              <ScrollArea className="h-full mt-6">
                                <div className="space-y-6 pr-4">
                                  {/* Mobile filter content - same as desktop */}
                                  <div className="space-y-3">
                                    <Label className="text-white font-medium">Categories</Label>
                                    <div className="space-y-2">
                                      {availableCategories.map((category) => (
                                        <Button
                                          key={category}
                                          variant={currentFilters.category === category ? "default" : "ghost"}
                                          className={`w-full justify-start ${currentFilters.category === category
                                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black"
                                            : "text-white hover:bg-white/10"
                                            }`}
                                          onClick={() => handleFilterChange("category", category)}
                                        >
                                          {category}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                  <Separator className="bg-white/20" />
                                  <div className="space-y-3">
                                    <Label className="text-white font-medium">Brand</Label>
                                    <Select
                                      value={currentFilters.brand}
                                      onValueChange={(value) => handleFilterChange("brand", value)}
                                    >
                                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-yellow-400">
                                        <SelectValue placeholder="Select brand" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-gray-800 border-gray-700">
                                        {availableBrands.map((brand) => (
                                          <SelectItem
                                            key={brand}
                                            value={brand}
                                            className="text-white hover:bg-gray-700"
                                          >
                                            {brand}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Separator className="bg-white/20" />
                                  <div className="space-y-3">
                                    <Label className="text-white font-medium">
                                      Price Range: {formatPrice(currentFilters.min_price)} -{" "}
                                      {formatPrice(currentFilters.max_price)}
                                    </Label>
                                    <Slider
                                      value={[currentFilters.min_price, currentFilters.max_price]}
                                      onValueChange={(value) => handleFilterChange("price_range", value)}
                                      max={maxPrice}
                                      min={0}
                                      step={10}
                                      className="w-full"
                                    />
                                  </div>
                                  <Separator className="bg-white/20" />
                                  <div className="space-y-4">
                                    <Label className="text-white font-medium">Special Offers</Label>
                                    <div className="space-y-3">
                                      <div className="flex items-center space-x-3">
                                        <Checkbox
                                          id="mobile-on-sale"
                                          checked={currentFilters.on_sale}
                                          onCheckedChange={(checked) => handleFilterChange("on_sale", checked)}
                                          className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                        />
                                        <Label htmlFor="mobile-on-sale" className="text-white cursor-pointer">
                                          On Sale
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        <Checkbox
                                          id="mobile-featured"
                                          checked={currentFilters.featured}
                                          onCheckedChange={(checked) => handleFilterChange("featured", checked)}
                                          className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                        />
                                        <Label htmlFor="mobile-featured" className="text-white cursor-pointer">
                                          Featured Products
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        <Checkbox
                                          id="mobile-in-stock"
                                          checked={currentFilters.in_stock}
                                          onCheckedChange={(checked) => handleFilterChange("in_stock", checked)}
                                          className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                        />
                                        <Label htmlFor="mobile-in-stock" className="text-white cursor-pointer">
                                          In Stock
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                              <Button
                                variant="outline"
                                className="w-full border-white/20 text-white hover:bg-white/10 bg-white/5 mt-6"
                                onClick={clearFilters}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Clear All Filters
                              </Button>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                      {/* Active Filters */}
                      {(currentFilters.search ||
                        currentFilters.category !== "All" ||
                        currentFilters.brand !== "All" ||
                        currentFilters.on_sale ||
                        currentFilters.featured ||
                        currentFilters.in_stock) && (
                          <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-white/10">
                            <span className="text-sm text-gray-400">Active filters:</span>
                            {currentFilters.search && (
                              <Badge
                                variant="secondary"
                                className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                              >
                                Search: {currentFilters.search}
                              </Badge>
                            )}
                            {currentFilters.category !== "All" && (
                              <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30">
                                {currentFilters.category}
                              </Badge>
                            )}
                            {currentFilters.brand !== "All" && (
                              <Badge variant="secondary" className="bg-pink-400/20 text-pink-400 border-pink-400/30">
                                {currentFilters.brand}
                              </Badge>
                            )}
                            {currentFilters.on_sale && (
                              <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
                                On Sale
                              </Badge>
                            )}
                            {currentFilters.featured && (
                              <Badge
                                variant="secondary"
                                className="bg-purple-400/20 text-purple-400 border-purple-400/30"
                              >
                                Featured
                              </Badge>
                            )}
                            {currentFilters.in_stock && (
                              <Badge
                                variant="secondary"
                                className="bg-orange-400/20 text-orange-400 border-orange-400/30"
                              >
                                In Stock
                              </Badge>
                            )}
                          </div>
                        )}
                    </CardContent>
                  </Card>
                  {/* Products Grid */}
                  {products.data.length > 0 ? (
                    <>
                      <motion.div
                        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                          }`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {products.data.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <ProductCard
                              id={product.id} // Pass product ID
                              title={product.name}
                              price={formatPrice(product.price)}
                              originalPrice={product.special_price ? formatPrice(product.special_price) : undefined}
                              rating={product.rating || 0}
                              reviews={formatReviews(product.reviews_count || 0)}
                              image={product.main_image_url}
                              showDiscount={!!product.special_price}
                              onViewDetails={() => console.log("View details:", product.name)}
                              onAddToCart={() => addItem(product)} // Pass the product object to addItem
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                      {/* Pagination */}
                      {products.links.length > 3 && ( // Only show pagination if there are more than just prev/next links
                        <motion.div
                          className="flex justify-center items-center gap-4 mt-12"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {products.links.map((link, index) => (
                            <Button
                              key={index}
                              variant={link.active ? "default" : "outline"}
                              className={
                                link.active
                                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300"
                                  : "border-white/20 text-white hover:bg-white/10 bg-white/5"
                              }
                              onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                              disabled={!link.url}
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
                        <CardContent className="p-12 text-center">
                          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-yellow-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
                          <p className="text-gray-400 mb-8">
                            We couldn't find any products matching your search criteria. Try adjusting your filters or
                            search terms.
                          </p>
                          <Button
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 font-semibold"
                            onClick={clearFilters}
                          >
                            Clear All Filters
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
      <Toaster richColors position="bottom-right" /> {/* Add Toaster component */}
    </>
  )
}
