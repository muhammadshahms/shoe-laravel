"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export type Banner = {
    id: number
    title: string
    description: string
    banner_image: string
    is_active: boolean
    type: "banner"
}

interface Banners {
    banners: Banner[]
}

export default function SimpleBanner({ banners }: Banners) {
    const [currentBanner, setCurrentBanner] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [banners.length])

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length)
    }

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
    }

    return (
        <section className="relative px-4 py-20 overflow-hidden">
            {/* <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                    Featured Collections
                </h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Explore our handpicked selection of premium footwear collections.
                </p>
            </motion.div> */}

            <div className="relative max-w-6xl mx-auto">
                {/* Banner Container */}
                <div className="relative h-96 rounded-3xl overflow-hidden">
                    {banners.map((banner, index) => (
                        <motion.div
                            key={banner.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{
                                opacity: index === currentBanner ? 1 : 0,
                                scale: index === currentBanner ? 1 : 1.1,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            {/* Banner Image */}
                            <div
                                className="w-full h-full bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${banner.banner_image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex items-center justify-start pl-12">
                                    <motion.div
                                        className="text-left max-w-lg"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{
                                            opacity: index === currentBanner ? 1 : 0,
                                            x: index === currentBanner ? 0 : -50,
                                        }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                                            {banner.title}
                                        </h2>
                                        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                                            {banner.description}
                                        </p>
                                        <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-xl hover:from-yellow-300 hover:to-orange-300 font-semibold shadow-lg hover:shadow-yellow-400/25 transition-all duration-300">
                                            Shop Collection
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
