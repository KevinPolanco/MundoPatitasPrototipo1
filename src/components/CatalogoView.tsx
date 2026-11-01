import React, { useState, useMemo } from "react"
import { useApp } from "../context/AppContext"
import { CATEGORIES } from "../data/mockData"
import { CategoryName, Product } from "../types"
import {
  Search,
  ShoppingCart,
  Star,
  Filter,
  Sparkles,
  PackageX,
  Check,
  Info,
  Tag,
  Eye,
  SlidersHorizontal,
  X,
} from "lucide-react"

export const CatalogoView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedPetFilter,
    setSelectedPetFilter,
    addToCart,
    cart,
    selectedProductDetail,
    setSelectedProductDetail,
  } = useApp()

  const [sortBy, setSortBy] =
    useState<"populares" | "precio-asc" | "precio-desc">("populares")

  // Filter products by category, pet filter, and search query
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // 1. Category match
        if (selectedCategory !== "Todas" && p.categoria !== selectedCategory) {
          return false
        }
        // 2. Pet type match
        if (selectedPetFilter !== "todos") {
          if (
            p.tipoMascota !== "ambos" &&
            p.tipoMascota !== selectedPetFilter
          ) {
            return false
          }
        }
        // 3. Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchName = p.nombre.toLowerCase().includes(q)
          const matchCategory = p.categoria.toLowerCase().includes(q)
          const matchDesc = p.descripcion.toLowerCase().includes(q)
          if (!matchName && !matchCategory && !matchDesc) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === "precio-asc") return a.precio - b.precio
        if (sortBy === "precio-desc") return b.precio - a.precio
        return b.rating - a.rating // populares
      })
  }, [products, selectedCategory, selectedPetFilter, searchQuery, sortBy])

  const getCartQuantity = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId)
    return item ? item.cantidad : 0
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header and Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 block mb-1">
              Catálogo Oficial Mundo Patitas
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {selectedCategory === "Todas"
                ? "Todos los Productos"
                : selectedCategory}
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Selección especializada en nutrición, diversión y cuidado para tus
              mascotas con stock real garantizado.
            </p>
          </div>

          {/* Active Search & Reset */}
          {searchQuery && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-950">
              <span>Buscando: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-amber-200 rounded-md"
                aria-label="Eliminar filtro de búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Category Navigation Pills */}
        <nav aria-label="Categorías de productos" className="mt-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory("Todas")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 ${
                selectedCategory === "Todas"
                  ? "bg-amber-700 text-white shadow-md"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
              }`}
            >
              Todas las categorías
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              const count = products.filter((p) => p.categoria === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700 ${
                    isSelected
                      ? "bg-amber-700 text-white shadow-md"
                      : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isSelected
                        ? "bg-amber-800 text-amber-100"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Filter bar: Pet Type & Sorting */}
        <div className="mt-4 p-3 bg-white rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Pet type filters */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-700 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-stone-500" /> Mascota:
            </span>
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedPetFilter("todos")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedPetFilter === "todos"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedPetFilter("perro")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedPetFilter === "perro"
                    ? "bg-white text-amber-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                🐶 Perros
              </button>
              <button
                onClick={() => setSelectedPetFilter("gato")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedPetFilter === "gato"
                    ? "bg-white text-amber-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                🐱 Gatos
              </button>
            </div>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="font-bold text-stone-700 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-500" /> Ordenar:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <option value="populares">Más populares / Mejor valorados</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty category state */}
      {filteredProducts.length === 0 ? (
        <div
          role="status"
          className="bg-white rounded-3xl border-2 border-dashed border-stone-300 p-10 sm:p-16 text-center max-w-xl mx-auto my-8 animate-in fade-in"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
            <PackageX className="w-8 h-8 stroke-[2]" aria-hidden="true" />
          </div>

          {/* Exact required text: "No hay productos disponibles en esta categoría." */}
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
            No hay productos disponibles en esta categoría.
          </h2>

          <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
            Estamos renovando el stock de <strong>{selectedCategory}</strong>{" "}
            con nuevos lanzamientos y ofertas especiales. Te invitamos a revisar
            nuestras otras categorías.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("Todas")
                setSearchQuery("")
                setSelectedPetFilter("todos")
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
            >
              Ver todas las categorías
            </button>
            <button
              onClick={() => setSelectedCategory("Alimento")}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600"
            >
              Ir a Alimento
            </button>
          </div>
        </div>
      ) : (
        /* Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isOutOfStock = product.stock <= 0
            const qtyInCart = getCartQuantity(product.id)
            const isLowStock = product.stock > 0 && product.stock <= 3

            return (
              <article
                key={product.id}
                className={`bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group ${
                  isOutOfStock ? "opacity-90" : ""
                }`}
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={product.imagen}
                    alt={`Fotografía de ${product.nombre}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-bold rounded-lg shadow-xs">
                    {product.categoria}
                  </span>

                  {/* Out of stock or highlight badge */}
                  {isOutOfStock ? (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-700 text-white text-xs font-black rounded-lg shadow-md uppercase tracking-wider">
                      Agotado
                    </span>
                  ) : isLowStock ? (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-600 text-white text-xs font-black rounded-lg shadow-md animate-pulse">
                      ¡Solo {product.stock} un.!
                    </span>
                  ) : product.badge ? (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-700 text-white text-xs font-black rounded-lg shadow-md">
                      {product.badge}
                    </span>
                  ) : null}

                  {/* Quick view button */}
                  <button
                    onClick={() => setSelectedProductDetail(product)}
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-xs transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                    aria-label={`Ver detalles de ${product.nombre}`}
                    title="Ver ficha técnica"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-2">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-stone-800 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span>•</span>
                      <span>({product.reviewsCount} reseñas)</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2 min-h-11">
                      {product.nombre}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.descripcion}
                    </p>
                  </div>

                  {/* Footer: Price & Stock & Action */}
                  <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-stone-500 block leading-none mb-0.5">
                          Precio
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-stone-900">
                          ${product.precio.toLocaleString("es-CL")}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-stone-500 block">
                          Stock
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            isOutOfStock
                              ? "text-red-700"
                              : isLowStock
                                ? "text-amber-700"
                                : "text-emerald-700"
                          }`}
                        >
                          {isOutOfStock
                            ? "0 unidades"
                            : `${product.stock} disponibles`}
                        </span>
                      </div>
                    </div>

                    {/* Button requirement:
                        If out of stock: Button "Agotado" disabled
                        If has stock: Button "Agregar al carro"
                    */}
                    {isOutOfStock ? (
                      <button
                        disabled
                        aria-disabled="true"
                        className="w-full py-3 px-4 rounded-xl bg-stone-200 text-stone-500 font-bold text-sm cursor-not-allowed border border-stone-300 flex items-center justify-center gap-2"
                      >
                        <span>Agotado</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id, 1)}
                        className="w-full py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
                        aria-label={`Agregar ${product.nombre} al carro, precio $${product.precio.toLocaleString("es-CL")}`}
                      >
                        <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                        <span>Agregar al carro</span>
                        {qtyInCart > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 bg-amber-900 text-amber-100 rounded-full text-xs font-bold">
                            {qtyInCart} en carro
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden animate-in zoom-in-95">
            <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Ficha de Producto • SKU: {selectedProductDetail.sku}
              </span>
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src={selectedProductDetail.imagen}
                  alt={selectedProductDetail.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase">
                    {selectedProductDetail.categoria}
                  </span>
                  <h2
                    id="product-detail-modal-title"
                    className="text-xl font-black text-stone-900 mt-1"
                  >
                    {selectedProductDetail.nombre}
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-stone-800">
                      {selectedProductDetail.rating}
                    </span>
                    <span className="text-stone-500">
                      ({selectedProductDetail.reviewsCount} opiniones)
                    </span>
                  </div>

                  <p className="text-stone-700 text-sm mt-3 leading-relaxed">
                    {selectedProductDetail.descripcion}
                  </p>

                  <div className="mt-4 p-3 bg-stone-50 rounded-xl space-y-1 text-xs text-stone-700">
                    <p>
                      <strong>Apto para:</strong>{" "}
                      {selectedProductDetail.tipoMascota === "ambos"
                        ? "Perros y Gatos"
                        : selectedProductDetail.tipoMascota === "perro"
                          ? "Perros"
                          : "Gatos"}
                    </p>
                    <p>
                      <strong>Disponibilidad:</strong>{" "}
                      {selectedProductDetail.stock > 0
                        ? `${selectedProductDetail.stock} unidades listas para despacho`
                        : "Agotado temporalmente"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">
                    ${selectedProductDetail.precio.toLocaleString("es-CL")}
                  </span>

                  {selectedProductDetail.stock <= 0 ? (
                    <button
                      disabled
                      className="px-5 py-2.5 rounded-xl bg-stone-200 text-stone-500 font-bold text-sm cursor-not-allowed"
                    >
                      Agotado
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(selectedProductDetail.id, 1)
                        setSelectedProductDetail(null)
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm flex items-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Agregar al carro</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
