import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Header = () => {
    return (
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
    )
}

export default Header
