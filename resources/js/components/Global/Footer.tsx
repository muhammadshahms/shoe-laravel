"use client"

import type React from "react"

import { Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 2000)
    }
  }

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Story", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Size Guide", href: "#" },
        { name: "Shipping Info", href: "#" },
        { name: "Returns & Exchanges", href: "#" },
        { name: "Track Your Order", href: "#" },
      ],
    },
    {
      title: "Policies",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Accessibility", href: "#" },
        { name: "Sitemap", href: "#" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Running Shoes", href: "#" },
        { name: "Basketball", href: "#" },
        { name: "Lifestyle", href: "#" },
        { name: "Training", href: "#" },
        { name: "Sale", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-400" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-yellow-400 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-yellow-400 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">AllRun</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Discover the perfect blend of style, comfort, and performance. Your journey to excellence starts with
                  the right pair of shoes.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <span>123 Fashion Street, Style City, SC 12345</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <span>hello@allrun.com</span>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:bg-gray-700`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  >
                    <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                        >
                          <a
                            href={link.href}
                            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
                          >
                            {link.name}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Stay in the Loop</h4>
                <p className="text-gray-400">
                  Get the latest updates on new arrivals, exclusive deals, and style tips delivered to your inbox.
                </p>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 h-12"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-yellow-400 text-black hover:bg-yellow-300 h-12 px-6 font-semibold"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        ✓ Subscribed!
                      </motion.span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">500K+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">1M+</div>
                <div className="text-gray-400 text-sm">Products Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.9★</div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 bg-black/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">© 2024 AllRun. All rights reserved.</div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span>for sneaker enthusiasts</span>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
