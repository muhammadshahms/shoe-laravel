"use client"

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
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Grid3X3, List, X, ChevronDown, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import Header from "@/components/Global/Header"
import ProductCard from "@/components/Global/ProductCard"
import Footer from "@/components/Global/Footer"


// Sample product data
const allProducts = [
    {
        id: 1,
        title: "Nike Air Max 270 React",
        price: "$210",
        originalPrice: "$280",
        rating: 4.9,
        reviews: "2.5k+",
        image: "/3.png",
        category: "Running",
        brand: "Nike",
        isNew: true,
        isSale: true,
    },
    {
        id: 2,
        title: "Nike Air Force 1",
        price: "$190",
        originalPrice: "$240",
        rating: 4.8,
        reviews: "1.8k+",
        image: "/1.png",
        category: "Lifestyle",
        brand: "Nike",
        isNew: false,
        isSale: true,
    },
    {
        id: 3,
        title: "Nike React Infinity",
        price: "$160",
        originalPrice: "$200",
        rating: 4.7,
        reviews: "950+",
        image: "/2.png",
        category: "Running",
        brand: "Nike",
        isNew: true,
        isSale: false,
    },
    {
        id: 4,
        title: "Nike Zoom Pegasus",
        price: "$120",
        originalPrice: "$150",
        rating: 4.6,
        reviews: "1.2k+",
        image: "/4.png",
        category: "Training",
        brand: "Nike",
        isNew: false,
        isSale: true,
    },
    {
        id: 5,
        title: "Adidas Ultraboost 22",
        price: "$180",
        originalPrice: "$220",
        rating: 4.8,
        reviews: "1.5k+",
        image: "/1.png",
        category: "Running",
        brand: "Adidas",
        isNew: true,
        isSale: false,
    },
    {
        id: 6,
        title: "Adidas Stan Smith",
        price: "$100",
        originalPrice: "$120",
        rating: 4.5,
        reviews: "2.1k+",
        image: "/2.png",
        category: "Lifestyle",
        brand: "Adidas",
        isNew: false,
        isSale: true,
    },
    {
        id: 7,
        title: "Puma RS-X",
        price: "$110",
        originalPrice: "$140",
        rating: 4.4,
        reviews: "800+",
        image: "/3.png",
        category: "Lifestyle",
        brand: "Puma",
        isNew: false,
        isSale: true,
    },
    {
        id: 8,
        title: "New Balance 990v5",
        price: "$185",
        originalPrice: "$220",
        rating: 4.7,
        reviews: "1.1k+",
        image: "/4.png",
        category: "Running",
        brand: "New Balance",
        isNew: true,
        isSale: false,
    },
    {
        id: 9,
        title: "Converse Chuck Taylor",
        price: "$65",
        originalPrice: "$80",
        rating: 4.3,
        reviews: "3.2k+",
        image: "/1.png",
        category: "Lifestyle",
        brand: "Converse",
        isNew: false,
        isSale: true,
    },
    {
        id: 10,
        title: "Vans Old Skool",
        price: "$75",
        originalPrice: "$90",
        rating: 4.4,
        reviews: "2.8k+",
        image: "/2.png",
        category: "Lifestyle",
        brand: "Vans",
        isNew: false,
        isSale: true,
    },
]

const categories = ["All", "Running", "Lifestyle", "Training", "Basketball"]
const brands = ["All", "Nike", "Adidas", "Puma", "New Balance", "Converse", "Vans"]
const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
]

export default function ShopPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedBrand, setSelectedBrand] = useState("All")
    const [sortBy, setSortBy] = useState("featured")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [priceRange, setPriceRange] = useState([0, 300])
    const [showOnSale, setShowOnSale] = useState(false)
    const [showNewOnly, setShowNewOnly] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchOpen, setSearchOpen] = useState(false)
    const productsPerPage = 8

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        const filtered = allProducts.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
            const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
            const price = Number.parseInt(product.price.replace("$", ""))
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
            const matchesSale = !showOnSale || product.isSale
            const matchesNew = !showNewOnly || product.isNew

            return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesSale && matchesNew
        })

        // Sort products
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", "")))
                break
            case "price-high":
                filtered.sort((a, b) => Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", "")))
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case "newest":
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
                break
            default:
                break
        }

        return filtered
    }, [searchQuery, selectedCategory, selectedBrand, sortBy, priceRange, showOnSale, showNewOnly])

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategory("All")
        setSelectedBrand("All")
        setSortBy("featured")
        setPriceRange([0, 300])
        setShowOnSale(false)
        setShowNewOnly(false)
        setCurrentPage(1)
    }

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Brand Filter */}
            <div className="space-y-3">
                <Label className="text-white font-medium">Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-yellow-400">
                        <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                        {brands.map((brand) => (
                            <SelectItem key={brand} value={brand} className="text-white hover:bg-gray-700">
                                {brand}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
                <Label className="text-white font-medium">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={300} min={0} step={10} className="w-full" />
            </div>

            <Separator className="bg-white/20" />

            {/* Special Filters */}
            <div className="space-y-4">
                <Label className="text-white font-medium">Special Offers</Label>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="on-sale"
                            checked={showOnSale}
                            onCheckedChange={setShowOnSale}
                            className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                        />
                        <Label htmlFor="on-sale" className="text-white cursor-pointer">
                            On Sale
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="new-arrivals"
                            checked={showNewOnly}
                            onCheckedChange={setShowNewOnly}
                            className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                        />
                        <Label htmlFor="new-arrivals" className="text-white cursor-pointer">
                            New Arrivals
                        </Label>
                    </div>
                </div>
            </div>

            <Separator className="bg-white/20" />

            {/* Clear Filters */}
            <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 bg-white/5"
                onClick={clearFilters}
            >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
            </Button>
        </div>
    )

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

                    {/* Main Content Grid - Filters Left, Products Right */}
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
                                                    className="text-gray-400 hover:text-white"
                                                    onClick={clearFilters}
                                                >
                                                    <X className="w-4 h-4 mr-1" />
                                                    Clear
                                                </Button>
                                            </div>

                                            <ScrollArea className="h-[calc(100vh-200px)]">
                                                <div className="space-y-6">
                                                    {/* Search */}
                                                    <div className="space-y-3">
                                                        <Label className="text-white font-medium">Search</Label>
                                                        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    aria-expanded={searchOpen}
                                                                    className="w-full justify-start bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                                                                >
                                                                    <Search className="w-4 h-4 mr-2 text-gray-400" />
                                                                    {searchQuery || "Search products..."}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700" align="start">
                                                                <Command>
                                                                    <CommandInput
                                                                        placeholder="Search products..."
                                                                        value={searchQuery}
                                                                        onValueChange={setSearchQuery}
                                                                        className="text-white"
                                                                    />
                                                                    <CommandList>
                                                                        <CommandEmpty>No products found.</CommandEmpty>
                                                                        <CommandGroup heading="Suggestions">
                                                                            {["Nike Air Max", "Running shoes", "Basketball shoes", "Lifestyle sneakers"].map(
                                                                                (suggestion) => (
                                                                                    <CommandItem
                                                                                        key={suggestion}
                                                                                        onSelect={() => {
                                                                                            setSearchQuery(suggestion)
                                                                                            setSearchOpen(false)
                                                                                        }}
                                                                                        className="text-white hover:bg-gray-700"
                                                                                    >
                                                                                        {suggestion}
                                                                                    </CommandItem>
                                                                                ),
                                                                            )}
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
                                                            {categories.map((category) => (
                                                                <Button
                                                                    key={category}
                                                                    variant={selectedCategory === category ? "default" : "ghost"}
                                                                    className={`w-full justify-start ${selectedCategory === category
                                                                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300"
                                                                            : "text-white hover:bg-white/10"
                                                                        }`}
                                                                    onClick={() => setSelectedCategory(category)}
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
                                                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                                            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-yellow-400">
                                                                <SelectValue placeholder="Select brand" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                                {brands.map((brand) => (
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
                                                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                                                        </Label>
                                                        <Slider
                                                            value={priceRange}
                                                            onValueChange={setPriceRange}
                                                            max={300}
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
                                                                    checked={showOnSale}
                                                                    onCheckedChange={setShowOnSale}
                                                                    className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                                                />
                                                                <Label htmlFor="on-sale" className="text-white cursor-pointer">
                                                                    On Sale
                                                                </Label>
                                                            </div>
                                                            <div className="flex items-center space-x-3">
                                                                <Checkbox
                                                                    id="new-arrivals"
                                                                    checked={showNewOnly}
                                                                    onCheckedChange={setShowNewOnly}
                                                                    className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                                                />
                                                                <Label htmlFor="new-arrivals" className="text-white cursor-pointer">
                                                                    New Arrivals
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
                                >
                                    {/* Top Controls */}
                                    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl mb-8">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                {/* Results Summary */}
                                                <div className="text-gray-300">
                                                    Showing <Badge className="bg-yellow-400/20 text-yellow-400">{paginatedProducts.length}</Badge>{" "}
                                                    of <Badge className="bg-yellow-400/20 text-yellow-400">{filteredProducts.length}</Badge>{" "}
                                                    products
                                                </div>

                                                {/* Controls */}
                                                <div className="flex items-center gap-4">
                                                    {/* Sort Dropdown */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className="border-white/20 text-white hover:bg-white/10 bg-white/5"
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
                                                                    onClick={() => setSortBy(option.value)}
                                                                    className="text-white hover:bg-gray-700"
                                                                >
                                                                    {option.label}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

                                                    {/* View Mode Toggle */}
                                                    {/* <div className="flex border border-white/20 rounded-xl overflow-hidden bg-white/5">
                                                        <Toggle
                                                            pressed={viewMode === "grid"}
                                                            onPressedChange={() => setViewMode("grid")}
                                                            className="h-10 w-10 data-[state=on]:bg-gradient-to-r data-[state=on]:from-yellow-400 data-[state=on]:to-orange-400 data-[state=on]:text-black"
                                                        >
                                                            <Grid3X3 className="w-4 h-4" />
                                                        </Toggle>
                                                        <Toggle
                                                            pressed={viewMode === "list"}
                                                            onPressedChange={() => setViewMode("list")}
                                                            className="h-10 w-10 data-[state=on]:bg-gradient-to-r data-[state=on]:from-yellow-400 data-[state=on]:to-orange-400 data-[state=on]:text-black"
                                                        >
                                                            <List className="w-4 h-4" />
                                                        </Toggle>
                                                    </div> */}

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
                                                                    Refine your search to find the perfect shoes
                                                                </SheetDescription>
                                                            </SheetHeader>
                                                            <ScrollArea className="h-full mt-6">
                                                                <div className="space-y-6">
                                                                    {/* Mobile filter content - same as desktop */}
                                                                    <div className="space-y-3">
                                                                        <Label className="text-white font-medium">Categories</Label>
                                                                        <div className="space-y-2">
                                                                            {categories.map((category) => (
                                                                                <Button
                                                                                    key={category}
                                                                                    variant={selectedCategory === category ? "default" : "ghost"}
                                                                                    className={`w-full justify-start ${selectedCategory === category
                                                                                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black"
                                                                                            : "text-white hover:bg-white/10"
                                                                                        }`}
                                                                                    onClick={() => setSelectedCategory(category)}
                                                                                >
                                                                                    {category}
                                                                                </Button>
                                                                            ))}
                                                                        </div>
                                                                    </div>

                                                                    <Separator className="bg-white/20" />

                                                                    <div className="space-y-3">
                                                                        <Label className="text-white font-medium">Brand</Label>
                                                                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                                                            <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-yellow-400">
                                                                                <SelectValue placeholder="Select brand" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                                                {brands.map((brand) => (
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
                                                                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                                                                        </Label>
                                                                        <Slider
                                                                            value={priceRange}
                                                                            onValueChange={setPriceRange}
                                                                            max={300}
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
                                                                                    checked={showOnSale}
                                                                                    onCheckedChange={setShowOnSale}
                                                                                    className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                                                                />
                                                                                <Label htmlFor="mobile-on-sale" className="text-white cursor-pointer">
                                                                                    On Sale
                                                                                </Label>
                                                                            </div>
                                                                            <div className="flex items-center space-x-3">
                                                                                <Checkbox
                                                                                    id="mobile-new-arrivals"
                                                                                    checked={showNewOnly}
                                                                                    onCheckedChange={setShowNewOnly}
                                                                                    className="border-white/20 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                                                                                />
                                                                                <Label htmlFor="mobile-new-arrivals" className="text-white cursor-pointer">
                                                                                    New Arrivals
                                                                                </Label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <Button
                                                                        variant="outline"
                                                                        className="w-full border-white/20 text-white hover:bg-white/10 bg-white/5"
                                                                        onClick={clearFilters}
                                                                    >
                                                                        <X className="w-4 h-4 mr-2" />
                                                                        Clear All Filters
                                                                    </Button>
                                                                </div>
                                                            </ScrollArea>
                                                        </SheetContent>
                                                    </Sheet>
                                                </div>
                                            </div>

                                            {/* Active Filters */}
                                            {(searchQuery ||
                                                selectedCategory !== "All" ||
                                                selectedBrand !== "All" ||
                                                showOnSale ||
                                                showNewOnly) && (
                                                    <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-white/10">
                                                        <span className="text-sm text-gray-400">Active filters:</span>
                                                        {searchQuery && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                                                            >
                                                                Search: {searchQuery}
                                                            </Badge>
                                                        )}
                                                        {selectedCategory !== "All" && (
                                                            <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30">
                                                                {selectedCategory}
                                                            </Badge>
                                                        )}
                                                        {selectedBrand !== "All" && (
                                                            <Badge variant="secondary" className="bg-pink-400/20 text-pink-400 border-pink-400/30">
                                                                {selectedBrand}
                                                            </Badge>
                                                        )}
                                                        {showOnSale && (
                                                            <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
                                                                On Sale
                                                            </Badge>
                                                        )}
                                                        {showNewOnly && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-purple-400/20 text-purple-400 border-purple-400/30"
                                                            >
                                                                New
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}
                                        </CardContent>
                                    </Card>

                                    {/* Products Grid */}
                                    {paginatedProducts.length > 0 ? (
                                        <>
                                            <motion.div
                                                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                                                    }`}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                {paginatedProducts.map((product, index) => (
                                                    <motion.div
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                                    >
                                                        <ProductCard
                                                            title={product.title}
                                                            price={product.price}
                                                            originalPrice={product.originalPrice}
                                                            rating={product.rating}
                                                            reviews={product.reviews}
                                                            image={product.image}
                                                            showDiscount={product.isSale}
                                                            onViewDetails={() => console.log("View details:", product.title)}
                                                            onAddToCart={() => console.log("Add to cart:", product.title)}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </motion.div>

                                            {/* Pagination */}
                                            {totalPages > 1 && (
                                                <motion.div
                                                    className="flex justify-center items-center gap-4 mt-12"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6, delay: 0.3 }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="border-white/20 text-white hover:bg-white/10 bg-white/5"
                                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </Button>

                                                    <div className="flex items-center gap-2">
                                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                            const page = i + 1
                                                            return (
                                                                <Button
                                                                    key={page}
                                                                    variant={page === currentPage ? "default" : "outline"}
                                                                    className={
                                                                        page === currentPage
                                                                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300"
                                                                            : "border-white/20 text-white hover:bg-white/10 bg-white/5"
                                                                    }
                                                                    onClick={() => setCurrentPage(page)}
                                                                >
                                                                    {page}
                                                                </Button>
                                                            )
                                                        })}
                                                    </div>

                                                    <Button
                                                        variant="outline"
                                                        className="border-white/20 text-white hover:bg-white/10 bg-white/5"
                                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </Button>
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
        </>
    )
}
