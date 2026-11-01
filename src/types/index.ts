export interface User {
  id: string
  nombre: string
  apellido: string
  rut: string
  email: string
  direccion: string
  telefono: string
  password?: string
  isActive: boolean
  createdAt: string
}

export type CategoryName = "Alimento" | "Juguetes" | "Camas" | "Correas" | "Higiene" | "Accesorios"

export interface Product {
  id: string
  nombre: string
  categoria: CategoryName
  precio: number
  imagen: string
  stock: number
  descripcion: string
  tipoMascota: "perro" | "gato" | "ambos"
  rating: number
  reviewsCount: number
  sku: string
  badge?: string
}

export interface CartItem {
  product: Product
  cantidad: number
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  despacho: number
  total: number
  fecha: string
  codigoAutorizacion: string
  metodoPago: string
  rutComprador: string
  direccionEnvio: string
}

export type ViewType = "inicio" | "registro" | "login" | "catalogo" | "carrito" | "pago" | "exito-pago"
