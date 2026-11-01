import React, { useState, useRef, useEffect } from "react"
import { useApp } from "../context/AppContext"
import { CATEGORIES } from "../data/mockData"
import { CategoryName } from "../types"
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  Package,
  Sparkles,
} from "lucide-react"

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    currentUser,
    logoutUser,
    cartCount,
    cartTotal,
    products,
  } = useApp()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchInput, setSearchInput] = useState(searchQuery)

  const catalogDropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Keep local search input synced
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        catalogDropdownRef.current &&
        !catalogDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCatalogDropdownOpen(false)
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false)
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(searchInput)
    setSelectedCategory("Todas")
    setCurrentView("catalogo")
    setIsSearchFocused(false)
  }

  const handleCategorySelect = (category: CategoryName | "Todas") => {
    setSelectedCategory(category)
    setCurrentView("catalogo")
    setIsCatalogDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  // Suggestions for search
  const searchSuggestions =
    searchInput.trim().length > 1
      ? products
          .filter(
            (p) =>
              p.nombre.toLowerCase().includes(searchInput.toLowerCase()) ||
              p.categoria.toLowerCase().includes(searchInput.toLowerCase()),
          )
          .slice(0, 4)
      : []

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro-bar for accessibility and customer assurance */}
      <div className="bg-stone-900 text-stone-100 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Envíos a todo Chile • Despacho gratis sobre $30.000</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span>Atención: Lun a Sáb 9:00 a 19:00 hrs</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline text-amber-300 font-semibold">
              Webpay Plus 100% Seguro
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* 1. Logo */}
          <button
            onClick={() => {
              setCurrentView("inicio")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 rounded-lg p-1"
            aria-label="Mundo Patitas - Ir al inicio"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 3C6.67 5 6 5.67 6 6.5S6.67 8 7.5 8 9 7.33 9 6.5 8.33 5 7.5 5zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-11 5C4.12 10 3.5 10.62 3.5 11.38s.62 1.38 1.5 1.38 1.5-.62 1.5-1.38-.62-1.38-1.5-1.38zm13 0c-.88 0-1.5.62-1.5 1.38s.62 1.38 1.5 1.38 1.5-.62 1.5-1.38-.62-1.38-1.5-1.38zM12 8.5c-3.04 0-5.5 2.24-5.5 5 0 2.21 1.6 3.99 3.82 4.49L9 21h6l-1.32-3.01C15.9 17.49 17.5 15.71 17.5 13.5c0-2.76-2.46-5-5.5-5z" />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-black tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                Mundo<span className="text-amber-700">Patitas</span>
              </span>
              <span className="block text-xs font-semibold tracking-wide text-stone-600 uppercase">
                Pet Shop & Nutrición
              </span>
            </div>
          </button>

          {/* 2. Search bar */}
          <div
            className="hidden md:flex flex-1 max-w-lg mx-2 relative"
            ref={searchRef}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="w-full relative"
              role="search"
            >
              <label htmlFor="header-search-input" className="sr-only">
                Buscar en el catálogo de Mundo Patitas
              </label>
              <input
                id="header-search-input"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Buscar alimentos, juguetes, camas..."
                className="w-full pl-11 pr-10 py-2.5 bg-stone-50 hover:bg-stone-100/80 focus:bg-white text-stone-900 placeholder:text-stone-500 rounded-full border border-stone-300 focus:border-amber-700 focus-visible:ring-3 focus-visible:ring-amber-700 text-sm transition-all"
              />
              <Search
                className="w-5 h-5 text-stone-500 absolute left-3.5 top-3 pointer-events-none"
                aria-hidden="true"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("")
                    setSearchQuery("")
                  }}
                  className="absolute right-3 top-2.5 p-1 text-stone-400 hover:text-stone-700 rounded-full"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Live Search suggestions */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                  Sugerencias rápidas
                </div>
                <div className="divide-y divide-stone-100">
                  {searchSuggestions.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        setSearchQuery(prod.nombre)
                        setCurrentView("catalogo")
                        setIsSearchFocused(false)
                      }}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-amber-50/70 transition-colors"
                    >
                      <img
                        src={prod.imagen}
                        alt=""
                        className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-900 truncate">
                          {prod.nombre}
                        </p>
                        <p className="text-xs text-stone-500">
                          {prod.categoria} • $
                          {prod.precio.toLocaleString("es-CL")}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Catalog Menu */}
          <div className="relative" ref={catalogDropdownRef}>
            <button
              onClick={() => setIsCatalogDropdownOpen(!isCatalogDropdownOpen)}
              onMouseEnter={() => setIsCatalogDropdownOpen(true)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 ${
                currentView === "catalogo"
                  ? "text-amber-800 bg-amber-50 border border-amber-200"
                  : "text-stone-800 hover:text-amber-800 hover:bg-stone-100"
              }`}
              aria-expanded={isCatalogDropdownOpen}
              aria-haspopup="true"
            >
              <span>Catálogo</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCatalogDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Catalog Dropdown */}
            {isCatalogDropdownOpen && (
              <div
                onMouseLeave={() => setIsCatalogDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1"
              >
                <div className="px-4 py-2 border-b border-stone-100">
                  <button
                    onClick={() => handleCategorySelect("Todas")}
                    className="w-full text-left text-sm font-bold text-amber-800 hover:underline flex items-center justify-between"
                  >
                    <span>Ver Todo el Catálogo</span>
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
                <div className="py-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-amber-50/80 transition-colors ${
                        selectedCategory === cat && currentView === "catalogo"
                          ? "font-bold text-amber-800 bg-amber-50"
                          : "text-stone-700"
                      }`}
                    >
                      <span>{cat}</span>
                      {cat === "Accesorios" && (
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded">
                          0 ítems
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Cart icon with counter */}
          <button
            onClick={() => setCurrentView("carrito")}
            className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-stone-800 hover:text-amber-800 hover:bg-stone-100 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 ${
              currentView === "carrito"
                ? "bg-amber-100 text-amber-900 ring-2 ring-amber-600"
                : ""
            }`}
            aria-label={`Ver carrito de compras, ${cartCount} productos, total: $${cartTotal.toLocaleString("es-CL")}`}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" aria-hidden="true" />
              {cartCount > 0 ? (
                <span
                  className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-amber-700 text-white text-xs font-black rounded-full flex items-center justify-center shadow-sm animate-pulse"
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-stone-200 text-stone-700 text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </div>
            <div className="hidden xl:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-stone-600">Mi Carro</span>
              <span className="text-xs font-black text-stone-900">
                ${cartTotal.toLocaleString("es-CL")}
              </span>
            </div>
          </button>

          {/* 5. User Account Actions */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              // Logged in user profile pill
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-full text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
                  aria-expanded={isUserDropdownOpen}
                  aria-label={`Menú de usuario: ${currentUser.nombre} ${currentUser.apellido}`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {currentUser.nombre.charAt(0)}
                    {currentUser.apellido.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="block font-black text-stone-900 leading-none">
                      Hola, {currentUser.nombre}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Cuenta Activa
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-stone-500" />
                </button>

                {/* User menu dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-500">
                        Sesión iniciada como
                      </p>
                      <p className="text-sm font-bold text-stone-900 truncate">
                        {currentUser.email}
                      </p>
                      <p className="text-xs text-stone-600 mt-1">
                        RUT: {currentUser.rut}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentView("catalogo")
                          setIsUserDropdownOpen(false)
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                      >
                        <Package className="w-4 h-4 text-stone-500" />
                        <span>Ir al Catálogo</span>
                      </button>
                      <button
                        onClick={() => {
                          logoutUser()
                          setIsUserDropdownOpen(false)
                          setCurrentView("inicio")
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Guest buttons: "Registrarse" and "Iniciar sesión"
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView("registro")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 ${
                    currentView === "registro"
                      ? "bg-amber-100 text-amber-950 font-black ring-2 ring-amber-600"
                      : "text-stone-800 hover:text-amber-800 hover:bg-stone-100"
                  }`}
                >
                  Registrarse
                </button>
                <button
                  onClick={() => setCurrentView("login")}
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 ${
                    currentView === "login"
                      ? "bg-amber-900 text-white ring-2 ring-amber-500"
                      : "bg-amber-700 hover:bg-amber-800 text-white"
                  }`}
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Iniciar sesión</span>
                </button>
              </div>
            )}

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-amber-800 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <label htmlFor="mobile-search-input" className="sr-only">
              Buscar en el catálogo
            </label>
            <input
              id="mobile-search-input"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-full text-sm text-stone-900 placeholder:text-stone-500 focus-visible:ring-3 focus-visible:ring-amber-700"
            />
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-2.5" />
          </form>
        </div>

        {/* Mobile slide-down menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 space-y-3">
            <div className="font-bold text-xs uppercase text-stone-500 tracking-wider">
              Categorías de Catálogo
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCategorySelect("Todas")}
                className="p-2.5 text-left text-sm rounded-lg bg-stone-100 font-bold text-stone-900 hover:bg-amber-100"
              >
                Ver Todo
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`p-2.5 text-left text-sm rounded-lg font-medium transition-colors ${
                    selectedCategory === cat && currentView === "catalogo"
                      ? "bg-amber-200 text-amber-950 font-bold"
                      : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
