"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, X, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Types
type VendingMachine = {
  id: number
  name: string
  image: string
}

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  machineIds: number[]
}

// Sample data
const vendingMachines: VendingMachine[] = [
  { id: 1, name: "Distributore Bevande", image: "/images/vending-drinks.jpg" },
  { id: 2, name: "Distributore Snack", image: "/images/vending-snacks.jpg" },
  { id: 3, name: "Distributore Pasti", image: "/images/vending-meals.jpg" },
]

const products: Product[] = [
  // Distributore Bevande (ID: 1) - 10 products
  {
    id: 1,
    name: "Acqua Naturale",
    description: "Acqua minerale naturale in bottiglia da 500ml.",
    price: 1.0,
    image: "/images/products/water.jpg",
    machineIds: [1],
  },
  {
    id: 2,
    name: "Coca Cola",
    description: "Bevanda gassata in lattina da 330ml.",
    price: 1.5,
    image: "/images/products/cola.jpg",
    machineIds: [1],
  },
  {
    id: 3,
    name: "Acqua Frizzante",
    description: "Acqua minerale frizzante in bottiglia da 500ml.",
    price: 1.0,
    image: "/images/products/sparkling-water.jpg",
    machineIds: [1],
  },
  {
    id: 4,
    name: "Succo d'Arancia",
    description: "Succo d'arancia 100% naturale, 330ml.",
    price: 2.0,
    image: "/images/products/orange-juice.jpg",
    machineIds: [1],
  },
  {
    id: 5,
    name: "Tè al Limone",
    description: "Tè freddo al limone, 330ml.",
    price: 1.8,
    image: "/images/products/iced-tea.jpg",
    machineIds: [1],
  },
  {
    id: 6,
    name: "Energy Drink",
    description: "Energy drink per una carica di energia, 250ml.",
    price: 2.5,
    image: "/images/products/energy-drink.jpg",
    machineIds: [1],
  },
  {
    id: 7,
    name: "Tè Verde",
    description: "Tè verde freddo, 330ml.",
    price: 1.8,
    image: "/images/products/iced-tea.jpg",
    machineIds: [1],
  },
  {
    id: 8,
    name: "Succo di Mela",
    description: "Succo di mela 100% naturale, 330ml.",
    price: 2.0,
    image: "/images/products/orange-juice.jpg",
    machineIds: [1],
  },
  {
    id: 9,
    name: "Limonata",
    description: "Limonata fresca, 330ml.",
    price: 1.8,
    image: "/images/products/iced-tea.jpg",
    machineIds: [1],
  },
  {
    id: 10,
    name: "Acqua Tonica",
    description: "Acqua tonica, 330ml.",
    price: 1.5,
    image: "/images/products/sparkling-water.jpg",
    machineIds: [1],
  },

  // Distributore Snack (ID: 2) - 10 products
  {
    id: 11,
    name: "Patatine",
    description: "Patatine croccanti al sale, confezione da 50g.",
    price: 1.2,
    image: "/images/products/chips.jpg",
    machineIds: [2],
  },
  {
    id: 12,
    name: "Cioccolato",
    description: "Barretta di cioccolato al latte da 100g.",
    price: 1.8,
    image: "/images/products/chocolate.jpg",
    machineIds: [2],
  },
  {
    id: 13,
    name: "Biscotti",
    description: "Biscotti di frolla, 80g.",
    price: 1.5,
    image: "/images/products/cookies.jpg",
    machineIds: [2],
  },
  {
    id: 14,
    name: "Crackers",
    description: "Crackers salati, 75g.",
    price: 1.2,
    image: "/images/products/crackers.jpg",
    machineIds: [2],
  },
  {
    id: 15,
    name: "Barretta Energetica",
    description: "Barretta energetica con cereali e cioccolato, 60g.",
    price: 2.2,
    image: "/images/products/chocolate.jpg",
    machineIds: [2],
  },
  {
    id: 16,
    name: "Mandorle",
    description: "Mandorle tostate e salate, 40g.",
    price: 2.5,
    image: "/images/products/chips.jpg",
    machineIds: [2],
  },
  {
    id: 17,
    name: "Gomme da Masticare",
    description: "Gomme da masticare alla menta, confezione da 10.",
    price: 1.0,
    image: "/images/products/cookies.jpg",
    machineIds: [2],
  },
  {
    id: 18,
    name: "Caramelle",
    description: "Caramelle assortite, 50g.",
    price: 1.2,
    image: "/images/products/cookies.jpg",
    machineIds: [2],
  },
  {
    id: 19,
    name: "Cioccolato Fondente",
    description: "Barretta di cioccolato fondente 70%, 80g.",
    price: 2.0,
    image: "/images/products/chocolate.jpg",
    machineIds: [2],
  },
  {
    id: 20,
    name: "Snack di Frutta Secca",
    description: "Mix di frutta secca, 60g.",
    price: 2.8,
    image: "/images/products/chips.jpg",
    machineIds: [2],
  },

  // Distributore Pasti (ID: 3) - 10 products
  {
    id: 21,
    name: "Sandwich",
    description: "Sandwich fresco con prosciutto e formaggio.",
    price: 3.5,
    image: "/images/products/sandwich.jpg",
    machineIds: [3],
  },
  {
    id: 22,
    name: "Insalata",
    description: "Insalata mista fresca con condimento.",
    price: 4.0,
    image: "/images/products/salad.jpg",
    machineIds: [3],
  },
  {
    id: 23,
    name: "Yogurt",
    description: "Yogurt bianco naturale, 150g.",
    price: 1.5,
    image: "/images/products/yogurt.jpg",
    machineIds: [3],
  },
  {
    id: 24,
    name: "Frutta Fresca",
    description: "Macedonia di frutta fresca, 200g.",
    price: 3.0,
    image: "/images/products/fruit.jpg",
    machineIds: [3],
  },
  {
    id: 25,
    name: "Tramezzino Vegetariano",
    description: "Tramezzino con verdure grigliate e hummus.",
    price: 3.8,
    image: "/images/products/sandwich.jpg",
    machineIds: [3],
  },
  {
    id: 26,
    name: "Pasta al Pomodoro",
    description: "Pasta fredda al pomodoro e basilico, 250g.",
    price: 4.5,
    image: "/images/products/salad.jpg",
    machineIds: [3],
  },
  {
    id: 27,
    name: "Croissant",
    description: "Croissant fresco.",
    price: 1.2,
    image: "/images/products/sandwich.jpg",
    machineIds: [3],
  },
  {
    id: 28,
    name: "Zuppa",
    description: "Zuppa di verdure, 300ml.",
    price: 3.5,
    image: "/images/products/salad.jpg",
    machineIds: [3],
  },
  {
    id: 29,
    name: "Panino al Tonno",
    description: "Panino con tonno e insalata.",
    price: 3.2,
    image: "/images/products/sandwich.jpg",
    machineIds: [3],
  },
  {
    id: 30,
    name: "Riso con Verdure",
    description: "Insalata di riso con verdure, 200g.",
    price: 4.0,
    image: "/images/products/salad.jpg",
    machineIds: [3],
  },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllProductsModal, setShowAllProductsModal] = useState(false)
  const [showMachineProductsModal, setShowMachineProductsModal] = useState<number | null>(null)
  const [isScrollPaused, setIsScrollPaused] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number | null>(null)
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null)
  const scrollPositionRef = useRef<number>(0)

  // Gestione degli eventi di scorrimento
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX
    scrollPositionRef.current = scrollContainerRef.current?.scrollLeft || 0
    setIsScrollPaused(true)

    // Cancella il timer esistente se presente
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    scrollPositionRef.current = scrollContainerRef.current?.scrollLeft || 0
    setIsScrollPaused(true)

    // Cancella il timer esistente se presente
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current)
    }
  }

  const handleMouseUp = () => {
    startXRef.current = null

    // Imposta un timer per riprendere lo scorrimento automatico dopo 2 secondi
    scrollTimerRef.current = setTimeout(() => {
      setIsScrollPaused(false)
    }, 2000)
  }

  const handleTouchEnd = () => {
    startXRef.current = null

    // Imposta un timer per riprendere lo scorrimento automatico dopo 2 secondi
    scrollTimerRef.current = setTimeout(() => {
      setIsScrollPaused(false)
    }, 2000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startXRef.current !== null && scrollContainerRef.current) {
      const diff = e.clientX - startXRef.current
      scrollContainerRef.current.scrollLeft = scrollPositionRef.current - diff

      // Preveniamo il comportamento predefinito per evitare selezioni di testo durante lo scorrimento
      e.preventDefault()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null && scrollContainerRef.current) {
      const diff = e.touches[0].clientX - startXRef.current
      scrollContainerRef.current.scrollLeft = scrollPositionRef.current - diff

      // Preveniamo il comportamento predefinito per evitare lo scroll della pagina
      e.preventDefault()
    }
  }

  // Gestione della pausa/ripresa dello scorrimento quando si aprono/chiudono i modali
  useEffect(() => {
    if (
      selectedProduct ||
      showAllProductsModal ||
      showMachineProductsModal !== null ||
      showInfoModal ||
      showContactModal
    ) {
      setIsScrollPaused(true)

      // Cancella il timer esistente se presente
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    } else {
      // Quando si chiude un modale, imposta un timer per riprendere lo scorrimento
      scrollTimerRef.current = setTimeout(() => {
        setIsScrollPaused(false)
      }, 1000)
    }

    // Cleanup del timer quando il componente viene smontato
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    }
  }, [selectedProduct, showAllProductsModal, showMachineProductsModal, showInfoModal, showContactModal])

  // Filter search results - always search through ALL products
  const searchResults = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const handleInfiniteScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollWidth = container.scrollWidth
    const containerWidth = container.clientWidth
    const maxScroll = scrollWidth - containerWidth

    // Se siamo vicini alla fine, torniamo all'inizio
    if (container.scrollLeft > maxScroll - 20) {
      container.scrollLeft = 0
    }

    // Se siamo vicini all'inizio e stiamo scorrendo all'indietro, andiamo alla fine
    if (container.scrollLeft < 20 && startXRef.current !== null) {
      container.scrollLeft = maxScroll - containerWidth
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      handleInfiniteScroll()
    }

    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="font-bold text-xl bg-gradient-to-r from-orange-600 to-orange-400 text-transparent bg-clip-text"
            >
              H24 LANGELLOTTI
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-sm hover:underline text-gray-700 hover:text-orange-600">
                Tutti
              </Link>
              <Link
                href="/?machine=1"
                className="text-sm hover:underline text-gray-700 hover:text-orange-600"
                onClick={(e) => {
                  e.preventDefault()
                  setShowMachineProductsModal(1)
                }}
              >
                Bevande
              </Link>
              <Link
                href="/?machine=2"
                className="text-sm hover:underline text-gray-700 hover:text-orange-600"
                onClick={(e) => {
                  e.preventDefault()
                  setShowMachineProductsModal(2)
                }}
              >
                Snack
              </Link>
              <Link
                href="/?machine=3"
                className="text-sm hover:underline text-gray-700 hover:text-orange-600"
                onClick={(e) => {
                  e.preventDefault()
                  setShowMachineProductsModal(3)
                }}
              >
                Pasti
              </Link>
            </nav>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cerca prodotti..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Search Results Dropdown */}
              {searchQuery.length > 0 && (
                <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          setSelectedProduct(product)
                          setSearchQuery("")
                        }}
                      >
                        <div className="w-10 h-10 relative mr-3 shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500 truncate">{product.description}</p>
                        </div>
                        <span className="text-orange-600 font-semibold ml-2">€{product.price.toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">Nessun prodotto trovato</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Featured Vending Machine */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 rounded-lg shadow-xl bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src="/images/store-front.jpg"
                alt="Locale H24 Langellotti"
                width={600}
                height={800}
                className="object-cover mx-auto rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 text-transparent bg-clip-text">
                H24 Langellotti
              </h1>
              <p className="text-lg text-gray-600">
                Il nostro locale offre distributori automatici con una vasta gamma di prodotti freschi e di qualità,
                disponibili 24 ore su 24, 7 giorni su 7.
              </p>
              <div className="flex space-x-4">
                <Button
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-6"
                  onClick={() => setShowInfoModal(true)}
                >
                  Scopri di più
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  onClick={() => setShowContactModal(true)}
                >
                  Contattaci
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* All Vending Machines */}
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-8 cursor-pointer hover:text-orange-600 flex items-center text-gray-900"
            onClick={() => setShowAllProductsModal(true)}
          >
            I Nostri Distributori
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vendingMachines.map((machine) => (
              <div
                key={machine.id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-gray-200"
                onClick={() => {
                  setShowMachineProductsModal(machine.id)
                }}
              >
                <div className="aspect-[3/4] relative">
                  <Image src={machine.image || "/placeholder.svg"} alt={machine.name} fill className="object-cover" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-medium text-gray-900">{machine.name}</span>
                  <Button
                    className="rounded-full text-xs px-4 py-1 h-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMachineProductsModal(machine.id)
                    }}
                  >
                    Vedi Prodotti
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Continuous Scrolling - Right after distributors */}
        <section className="mb-16 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-orange-600">Tutti i Prodotti</h2>
          </div>

          <div
            className="relative overflow-x-auto"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          >
            <div
              className={`flex ${isScrollPaused ? "" : "animate-infinite-scroll-slow"}`}
              style={{
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                minWidth: "max-content",
              }}
            >
              {[...products, ...products, ...products].map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg mx-2 shrink-0 w-[180px] border border-gray-200"
                  onClick={() => {
                    setSelectedProduct(product)
                  }}
                >
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="font-medium text-sm truncate max-w-[100px] text-gray-900">{product.name}</span>
                    <Button className="rounded-full text-xs px-3 py-0.5 h-auto bg-orange-600 hover:bg-orange-700 text-white">
                      €{product.price.toFixed(2)}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-6">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <DialogDescription>{selectedProduct.description}</DialogDescription>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-orange-600">€{selectedProduct.price.toFixed(2)}</span>
                <div className="text-sm text-gray-500">
                  Disponibile in:{" "}
                  {selectedProduct.machineIds.map((id) => vendingMachines.find((m) => m.id === id)?.name).join(", ")}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* All Products Modal */}
      <Dialog open={showAllProductsModal} onOpenChange={setShowAllProductsModal}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-orange-600">Tutti i Prodotti</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-gray-200"
                onClick={() => {
                  setSelectedProduct(product)
                  setShowAllProductsModal(false)
                }}
              >
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate text-gray-900">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-xs">
                      {vendingMachines.find((m) => product.machineIds.includes(m.id))?.name}
                    </span>
                    <span className="font-bold text-orange-600">€{product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Machine Products Modal */}
      {showMachineProductsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-orange-50">
              <div className="w-8"></div> {/* Spacer for centering */}
              <h2 className="text-xl font-bold text-center text-orange-600">
                {vendingMachines.find((m) => m.id === showMachineProductsModal)?.name}
              </h2>
              <button
                onClick={() => setShowMachineProductsModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products
                  .filter((product) => product.machineIds.includes(showMachineProductsModal))
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-gray-200"
                      onClick={() => {
                        setSelectedProduct(product)
                        setShowMachineProductsModal(null)
                      }}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate text-gray-900">{product.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-500 text-xs truncate max-w-[80px]">
                            {product.description.substring(0, 20)}...
                          </span>
                          <span className="font-bold text-orange-600">€{product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal - Scopri di Più */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-orange-600 text-2xl">Informazioni su H24 Langellotti</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Posizione</h3>
                <p className="text-gray-600">Via Roma 123, 00100 Roma, Italia</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Orari</h3>
                <p className="text-gray-600">Aperto 24 ore su 24, 7 giorni su 7</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-5 w-5 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">🚗</div>
              <div>
                <h3 className="font-medium text-gray-900">Parcheggio</h3>
                <p className="text-gray-600">Ampio parcheggio gratuito disponibile</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-5 w-5 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">🔒</div>
              <div>
                <h3 className="font-medium text-gray-900">Sicurezza</h3>
                <p className="text-gray-600">Area videosorvegliata 24 ore su 24</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-5 w-5 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">♿</div>
              <div>
                <h3 className="font-medium text-gray-900">Accessibilità</h3>
                <p className="text-gray-600">Struttura completamente accessibile</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal - Contattaci */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-orange-600 text-2xl">Contattaci</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Telefono</h3>
                <a href="tel:+390123456789" className="text-orange-600 hover:underline">
                  +39 01 2345 6789
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <a href="mailto:info@h24langellotti.it" className="text-orange-600 hover:underline">
                  info@h24langellotti.it
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-5 w-5 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">📱</div>
              <div>
                <h3 className="font-medium text-gray-900">WhatsApp</h3>
                <a href="https://wa.me/390123456789" className="text-orange-600 hover:underline">
                  +39 01 2345 6789
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Instagram className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Instagram</h3>
                <a href="https://instagram.com/h24langellotti" className="text-orange-600 hover:underline">
                  @h24langellotti
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Facebook className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Facebook</h3>
                <a href="https://facebook.com/h24langellotti" className="text-orange-600 hover:underline">
                  H24 Langellotti
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
