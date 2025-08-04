"use client"

import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    ChevronDown,
    Phone,
    Mail,
    Globe,
    Bell,
    Settings,
    LogOut,
    Package,
    Star,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import AppLogoIcon from "../app-logo-icon"
import AppLogo from "../app-logo"
// import { useCart } from "@/hooks/use-cart"
import { CartSheet } from "../CartSheet"
import { selectCartItemCount, useCartStore } from "@/hooks/cart-store"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)
    const [wishlistCount] = useState(5)
    const [notificationCount] = useState(2)
    const cartCount = useCartStore(selectCartItemCount)
    const openCart = () => useCartStore.getState().setOpen(true)
    // const { addItem, cartItemCount } = useCart() // Use the cart hook
    const [isCartOpen, setIsCartOpen] = useState(false) // State for cart sheet

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navigationItems = [
        {
            name: "Home",
            href: "#",
            hasDropdown: false,
        },
        {
            name: "Categories",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { name: "Running Shoes", href: "#", badge: "New" },
                { name: "Basketball", href: "#" },
                { name: "Lifestyle", href: "#" },
                { name: "Training", href: "#" },
                { name: "Boots", href: "#" },
                { name: "Sandals", href: "#", badge: "Sale" },
            ],
        },
        {
            name: "Brands",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { name: "Nike", href: "#" },
                { name: "Adidas", href: "#" },
                { name: "Puma", href: "#" },
                { name: "New Balance", href: "#" },
                { name: "Converse", href: "#" },
            ],
        },
        {
            name: "Sale",
            href: "#",
            hasDropdown: false,
            badge: "Hot",
        },
        {
            name: "About",
            href: "#",
            hasDropdown: false,
        },
        {
            name: "Contact",
            href: "#",
            hasDropdown: false,
        },
    ]

    const userMenuItems = [
        { name: "My Profile", icon: User, href: "#" },
        { name: "My Orders", icon: Package, href: "#", badge: "3" },
        { name: "Wishlist", icon: Heart, href: "#", badge: wishlistCount.toString() },
        { name: "Reviews", icon: Star, href: "#" },
        { name: "Settings", icon: Settings, href: "#" },
        { name: "Logout", icon: LogOut, href: "#" },
    ]

    const quickSearchSuggestions = ["Nike Air Max", "Running shoes", "Basketball shoes", "White sneakers", "Sale items"]

    return (
        <>
            {/* Top Bar */}
            <motion.div
                className="bg-black text-white py-2 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Phone className="w-4 h-4 text-yellow-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-gray-300">
                                <Mail className="w-4 h-4 text-yellow-400" />
                                <span>hello@allrun.com</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Globe className="w-4 h-4 text-yellow-400" />
                                <select className="bg-transparent text-white text-sm border-none outline-none cursor-pointer">
                                    <option value="en">English</option>
                                    {/* <option value="es">Español</option>
                                    <option value="fr">Français</option> */}
                                </select>
                            </div>
                            <div className="text-gray-300">
                                <select className="bg-transparent text-white text-sm border-none outline-none cursor-pointer">
                                    <option value="usd">PKR ₨</option>
                                    {/* <option value="eur">EUR €</option>
                                    <option value="gbp">GBP £</option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Header */}
            <motion.header
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800"
                    : "bg-gradient-to-r from-gray-900 to-black"
                    }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center gap-3 "
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <AppLogo />
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigationItems.map((item, index) => (
                                <div key={item.name} className="relative group">
                                    <motion.a
                                        href={item.href}
                                        className="flex items-center gap-1 text-white hover:text-yellow-400 transition-colors duration-300 py-2"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        {item.name}
                                        {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                                        {item.badge && (
                                            <Badge className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5">{item.badge}</Badge>
                                        )}
                                    </motion.a>

                                    {/* Dropdown Menu */}
                                    {item.hasDropdown && item.dropdownItems && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="py-2">
                                                {item.dropdownItems.map((dropdownItem) => (
                                                    <a
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className="flex items-center justify-between px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition-colors duration-200"
                                                    >
                                                        <span>{dropdownItem.name}</span>
                                                        {dropdownItem.badge && (
                                                            <Badge className="bg-yellow-400 text-black text-xs px-2 py-0.5">
                                                                {dropdownItem.badge}
                                                            </Badge>
                                                        )}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Input
                                    type="text"
                                    placeholder="Search for shoes, brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 pl-4 pr-10 h-10"
                                    onFocus={() => setIsSearchOpen(true)}
                                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

                                {/* Search Suggestions */}
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <motion.div
                                            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="py-2">
                                                <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">Popular Searches</div>
                                                {quickSearchSuggestions.map((suggestion) => (
                                                    <button
                                                        key={suggestion}
                                                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition-colors duration-200"
                                                        onClick={() => {
                                                            setSearchQuery(suggestion)
                                                            setIsSearchOpen(false)
                                                        }}
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4">
                            {/* Mobile Search */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-white hover:text-yellow-400 hover:bg-gray-800"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                <Search className="w-5 h-5" />
                            </Button>

                            {/* Notifications */}
                            {/* <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-white hover:text-yellow-400 hover:bg-gray-800"
                            >
                                <Bell className="w-5 h-5" />
                                {notificationCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                                        {notificationCount}
                                    </Badge>
                                )}
                            </Button> */}

                            {/* Wishlist */}
                            {/* <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-white hover:text-yellow-400 hover:bg-gray-800"
                            >
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                                        {wishlistCount}
                                    </Badge>
                                )}
                            </Button> */}

                            {/* Shopping Cart */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-white hover:bg-white/10 hover:text-yellow-400"
                                onClick={() => useCartStore.getState().setOpen(true)}
                            >
                                <ShoppingCart className="w-6 h-6 " />
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full px-2 py-0.5 text-xs font-bold">
                                        {cartCount}
                                    </Badge>
                                )}
                                <span className="sr-only">View Cart</span>
                            </Button>

                            {/* User Menu */}
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 text-white hover:text-yellow-400 hover:bg-gray-800"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-yellow-400 text-black">JD</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:block">John Doe</span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            className="absolute top-full right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="py-2">
                                                <div className="px-4 py-3 border-b border-gray-700">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarImage src="/placeholder.svg" />
                                                            <AvatarFallback className="bg-yellow-400 text-black">JD</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-white font-semibold">John Doe</div>
                                                            <div className="text-gray-400 text-sm">john@example.com</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {userMenuItems.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center justify-between px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition-colors duration-200"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <item.icon className="w-4 h-4" />
                                                            <span>{item.name}</span>
                                                        </div>
                                                        {item.badge && (
                                                            <Badge className="bg-yellow-400 text-black text-xs px-2 py-0.5">{item.badge}</Badge>
                                                        )}
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden text-white hover:text-yellow-400 hover:bg-gray-800"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            className="md:hidden border-t border-gray-800 bg-gray-900"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-3">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Search for shoes, brands..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 pl-4 pr-10"
                                    />
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="lg:hidden border-t border-gray-800 bg-gray-900"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navigationItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-between py-2 text-white hover:text-yellow-400 transition-colors duration-200"
                                    >
                                        <span>{item.name}</span>
                                        {item.badge && <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">{item.badge}</Badge>}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Click outside to close menus */}
            {(isUserMenuOpen || isSearchOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsUserMenuOpen(false)
                        setIsSearchOpen(false)
                    }}
                />
            )}
            <CartSheet />

        </>
    )
}

export default Header
