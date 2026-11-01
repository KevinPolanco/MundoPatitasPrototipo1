import React from "react"
import { useApp } from "../context/AppContext"
import { HERO_IMAGE, HERO_SECONDARY_IMAGE, CATEGORIES } from "../data/mockData"
import { CategoryName } from "../types"
import {
  Sparkles,
  ArrowRight,
  Truck,
  ShieldCheck,
  Heart,
  Star,
  ShoppingCart,
  UserPlus,
  Zap,
  Package,
} from "lucide-react"

export const InicioView: React.FC = () => {
  const { setCurrentView, setSelectedCategory, products, addToCart } = useApp()

  const featuredProducts = products.slice(0, 4)

  const handleCategoryClick = (category: CategoryName) => {
    setSelectedCategory(category)
    setCurrentView("catalogo")
  }

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-title"
        className="relative bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white overflow-hidden py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        {/* Background pet image with warm gradient overlay */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src={HERO_IMAGE}
            alt="Perro y gato descansando juntos pacíficamente"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/90 text-white text-xs font-black tracking-wide uppercase shadow-md">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Pet Shop & Nutrición Consciente en Chile</span>
            </div>

            {/* Exact required title from prompt */}
            <h1
              id="hero-title"
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white"
            >
              Más momentos felices, más patitas contentas.
            </h1>

            <p className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-2xl">
              Encuentra la mejor selección de alimentos certificados, camas
              antiestrés y juguetes que estimulan a tus mascotas. Despacho
              rápido a todo Chile y stock garantizado en tiempo real.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory("Todas")
                  setCurrentView("catalogo")
                }}
                className="px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-500"
              >
                <Package className="w-5 h-5" />
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setCurrentView("registro")}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-black text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white"
              >
                <UserPlus className="w-5 h-5 text-amber-700" />
                <span>Crear mi Cuenta</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-xs font-semibold text-stone-300">
              <div>
                <span className="block text-xl font-black text-white">
                  +5.000
                </span>
                <span>Mascotas felices</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">
                  24-48 hrs
                </span>
                <span>Envíos rápidos</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">
                  4.9 / 5.0
                </span>
                <span>Valoración de clientes</span>
              </div>
            </div>
          </div>

          {/* Hero right image card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src={HERO_SECONDARY_IMAGE}
                alt="Perro y gato compartiendo cariñosamente"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md rounded-2xl p-4 text-white border border-white/10">
                <p className="font-bold text-sm">
                  Nutrición y Confort Especializado
                </p>
                <p className="text-xs text-stone-300 mt-0.5">
                  Productos testeados y aprobados por veterinarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Strip */}
      <section
        aria-label="Beneficios de comprar en Mundo Patitas"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Despacho Gratis
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                En todas las compras superiores a $30.000 a todo Chile.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Webpay Plus 100% Seguro
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Transbank certificado con Redcompra y tarjetas de crédito.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Stock Real en Vivo
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Control automático de inventario para que nunca te falte.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Garantía de Felicidad
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Si a tu mascota no le gusta el sabor o talla, te lo cambiamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Explorer */}
      <section
        aria-labelledby="categories-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
              Explora por departamento
            </span>
            <h2
              id="categories-heading"
              className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight"
            >
              Categorías Principales
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("Todas")
              setCurrentView("catalogo")
            }}
            className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => {
            const count = products.filter(
              (p) => p.categoria === category,
            ).length
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-left group flex flex-col justify-between h-28 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
              >
                <span className="w-8 h-8 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-800 flex items-center justify-center transition-colors">
                  <Package className="w-4 h-4" />
                </span>
                <div>
                  <span className="font-bold text-sm text-stone-900 group-hover:text-amber-800 block leading-tight">
                    {category}
                  </span>
                  <span className="text-[11px] text-stone-500 font-semibold">
                    {count === 0 ? "Sin stock (Vacía)" : `${count} productos`}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section
        aria-labelledby="featured-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
              Los preferidos de la comunidad
            </span>
            <h2
              id="featured-heading"
              className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight"
            >
              Productos Destacados
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const isOutOfStock = product.stock <= 0

            return (
              <article
                key={product.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-stone-900/80 text-white text-[11px] font-bold rounded-md">
                    {product.categoria}
                  </span>
                  {isOutOfStock ? (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-700 text-white text-[11px] font-bold rounded-md">
                      Agotado
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-700 text-white text-[11px] font-bold rounded-md">
                      En Stock
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-stone-800">
                        {product.rating}
                      </span>
                      <span className="text-stone-500">
                        ({product.reviewsCount})
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm line-clamp-2 leading-snug">
                      {product.nombre}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-lg font-black text-stone-900">
                      ${product.precio.toLocaleString("es-CL")}
                    </span>

                    {isOutOfStock ? (
                      <button
                        disabled
                        className="px-3 py-1.5 rounded-xl bg-stone-200 text-stone-500 font-bold text-xs cursor-not-allowed"
                      >
                        Agotado
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id, 1)}
                        className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                        aria-label={`Agregar ${product.nombre} al carro`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Fast CTA Banner to Register */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black uppercase tracking-wider text-amber-200 block">
              Comunidad Mundo Patitas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              ¿Aún no eres miembro de nuestra manada?
            </h2>
            <p className="text-stone-200 text-sm leading-relaxed">
              Regístrate en menos de 1 minuto y recibe ofertas exclusivas,
              recordatorios de vacunación y seguimiento de tus pedidos en tiempo
              real.
            </p>
          </div>
          <button
            onClick={() => setCurrentView("registro")}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 flex-shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white"
          >
            <span>Crear mi cuenta gratis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  )
}
