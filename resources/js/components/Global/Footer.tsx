import { Instagram, Twitter, Youtube } from 'lucide-react';
import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full p-8 bg-gray-900 text-gray-400 mt-20 rounded-xl">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-yellow-400 text-lg font-bold">AllRun</h3>
                    <p className="text-sm">Enter your feedback below to improve collection and product feedback</p>
                    <form className="mt-2" onSubmit={(e) => { e.preventDefault(); alert('Feedback submitted!'); }}>
                        <input type="text" placeholder="@allrun.com" className="p-2 rounded-l bg-gray-800 border border-gray-700" />
                        <button className="p-2 bg-yellow-500 rounded-r text-white cursor-pointer" type="submit">→</button>
                    </form>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    <div>
                        <h4 className="font-semibold">Company</h4>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Delivery Information</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Service</h4>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Social Media</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-yellow-400"><span><Twitter /></span></a>
                            <a href="#" className="hover:text-yellow-400"><span><Instagram /></span></a>
                            <a href="#" className="hover:text-yellow-400"><span><Youtube /></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
