import { Product, User, CategoryName } from "../types"

export const CATEGORIES: CategoryName[] = [
  "Alimento",
  "Juguetes",
  "Camas",
  "Correas",
  "Higiene",
  "Accesorios",
]

export const INITIAL_PRODUCTS: Product[] = [
  // --- ALIMENTO ---
  {
    id: "prod-ali-1",
    nombre: "Alimento Premium Perro Adulto Salmón & Arroz 15kg",
    categoria: "Alimento",
    precio: 48990,
    imagen:
      "https://images.unsplash.com/photo-1714068691210-073dc52c6c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 8,
    descripcion:
      "Nutrición balanceada con salmón fresco, ácidos grasos Omega 3 y 6 para pelaje brillante y digestión óptima.",
    tipoMascota: "perro",
    rating: 4.9,
    reviewsCount: 142,
    sku: "PAT-ALI-001",
    badge: "Más Vendido",
  },
  {
    id: "prod-ali-2",
    nombre: "Alimento Gato Esterilizado Pollo & Avena 7.5kg",
    categoria: "Alimento",
    precio: 32990,
    imagen:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 12,
    descripcion:
      "Control de peso y cuidado del tracto urinario con fibra prebiótica natural para gatos esterilizados.",
    tipoMascota: "gato",
    rating: 4.8,
    reviewsCount: 96,
    sku: "PAT-ALI-002",
  },
  {
    id: "prod-ali-3",
    nombre: "Snacks Dentales para Perros Sabor Menta (30 un.)",
    categoria: "Alimento",
    precio: 7990,
    imagen:
      "https://images.unsplash.com/photo-1565674244283-993fb27a215f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 20,
    descripcion:
      "Reduce la acumulación de sarro y refresca el aliento con clorofila y minerales esenciales.",
    tipoMascota: "perro",
    rating: 4.7,
    reviewsCount: 64,
    sku: "PAT-ALI-003",
  },
  {
    id: "prod-ali-4",
    nombre: "Alimento Hipoalergénico Cordero & Chía 10kg",
    categoria: "Alimento",
    precio: 54990,
    imagen:
      "https://images.unsplash.com/photo-1655210913315-e8147faf7600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 0, // Out of stock for testing
    descripcion:
      "Fórmula mono-proteica libre de granos para mascotas con sensibilidades cutáneas o digestivas.",
    tipoMascota: "perro",
    rating: 4.9,
    reviewsCount: 51,
    sku: "PAT-ALI-004",
    badge: "Agotado Temporalmente",
  },

  // --- JUGUETES ---
  {
    id: "prod-jug-1",
    nombre: "Peluche Kong Oso Resistente con Sonajero",
    categoria: "Juguetes",
    precio: 12990,
    imagen:
      "https://images.unsplash.com/photo-1587559070757-f72a388edbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 6,
    descripcion:
      "Cuerpo reforzado con cuerdas internas sin relleno voluminoso para juego prolongado y seguro.",
    tipoMascota: "perro",
    rating: 4.9,
    reviewsCount: 88,
    sku: "PAT-JUG-001",
    badge: "Favorito",
  },
  {
    id: "prod-jug-2",
    nombre: "Pelota Interactiva Dispenser de Premios",
    categoria: "Juguetes",
    precio: 9490,
    imagen:
      "https://images.unsplash.com/photo-1627323721367-94128c3fa0f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 15,
    descripcion:
      "Estimulación mental y física. Gira y libera bocados a medida que tu mascota la hace rodar.",
    tipoMascota: "perro",
    rating: 4.6,
    reviewsCount: 42,
    sku: "PAT-JUG-002",
  },
  {
    id: "prod-jug-3",
    nombre: "Caña de Pescar con Plumas y Cascabel para Gatos",
    categoria: "Juguetes",
    precio: 5990,
    imagen:
      "https://images.unsplash.com/photo-1618397360709-9dd900837411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 2, // Low stock: 2 units, triggers stock limit quickly
    descripcion:
      "Fomenta el instinto cazador y la agilidad de los felinos con movimiento elástico y plumas naturales.",
    tipoMascota: "gato",
    rating: 4.8,
    reviewsCount: 110,
    sku: "PAT-JUG-003",
    badge: "Últimas 2 un.",
  },
  {
    id: "prod-jug-4",
    nombre: "Cuerda Mordedora de Algodón Natural XL",
    categoria: "Juguetes",
    precio: 8990,
    imagen:
      "https://images.unsplash.com/photo-1547525623-c7d42c20284c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 14,
    descripcion:
      "Hecha con fibras de algodón 100% natural trenzadas para limpiar dientes y masajear encías.",
    tipoMascota: "perro",
    rating: 4.5,
    reviewsCount: 37,
    sku: "PAT-JUG-004",
  },

  // --- CAMAS ---
  {
    id: "prod-cam-1",
    nombre: "Cama Nido Relajante Antiestrés Pelo Suave Gris L",
    categoria: "Camas",
    precio: 29990,
    imagen:
      "https://images.unsplash.com/photo-1492748046438-4b6d9ebe0c11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 4,
    descripcion:
      "Borde elevado que proporciona soporte para cabeza y cuello, dando sensación de refugio y calma.",
    tipoMascota: "ambos",
    rating: 4.9,
    reviewsCount: 175,
    sku: "PAT-CAM-001",
    badge: "Top Confort",
  },
  {
    id: "prod-cam-2",
    nombre: "Colchoneta Ortopédica Memory Foam Extra Grande",
    categoria: "Camas",
    precio: 42990,
    imagen:
      "https://images.unsplash.com/photo-1598397678815-c5dc869035b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 0, // Out of stock for testing
    descripcion:
      "Espuma viscoelástica de alta densidad que alivia articulaciones en perros senior o razas grandes.",
    tipoMascota: "perro",
    rating: 4.8,
    reviewsCount: 58,
    sku: "PAT-CAM-002",
    badge: "Agotado",
  },
  {
    id: "prod-cam-3",
    nombre: "Cueva Térmica Acolchada para Felinos",
    categoria: "Camas",
    precio: 24990,
    imagen:
      "https://images.unsplash.com/photo-1534521152192-2e2cb02c6ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 7,
    descripcion:
      "Diseño envolvente que mantiene el calor corporal. Cojín interior reversible y lavable a máquina.",
    tipoMascota: "gato",
    rating: 4.7,
    reviewsCount: 82,
    sku: "PAT-CAM-003",
  },

  // --- CORREAS ---
  {
    id: "prod-cor-1",
    nombre: "Arnés Ergonómico Antitirones Acolchado Reflectante",
    categoria: "Correas",
    precio: 18990,
    imagen:
      "https://images.unsplash.com/photo-1555265626-8ed04bde01a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 9,
    descripcion:
      "Distribuye la presión de manera uniforme en el pecho. Costuras reflectantes 3M para paseos nocturnos.",
    tipoMascota: "perro",
    rating: 4.9,
    reviewsCount: 133,
    sku: "PAT-COR-001",
    badge: "Seguridad",
  },
  {
    id: "prod-cor-2",
    nombre: "Correa Extensible Retráctil 5 Metros con Freno Seguro",
    categoria: "Correas",
    precio: 14990,
    imagen:
      "https://images.unsplash.com/photo-1708062270853-ee7c66b69f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 11,
    descripcion:
      "Mecanismo de frenado instantáneo con una sola mano. Cinta resistente apta para mascotas de hasta 25kg.",
    tipoMascota: "perro",
    rating: 4.6,
    reviewsCount: 79,
    sku: "PAT-COR-002",
  },
  {
    id: "prod-cor-3",
    nombre: "Collar de Cuero Vegano Ajustable con Placa Grabable",
    categoria: "Correas",
    precio: 11990,
    imagen:
      "https://images.unsplash.com/photo-1667716705760-233650f8f3fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 3,
    descripcion:
      "Material suave que previene roces en el cuello. Hebilla de aleación de zinc de alta durabilidad.",
    tipoMascota: "ambos",
    rating: 4.7,
    reviewsCount: 46,
    sku: "PAT-COR-003",
  },

  // --- HIGIENE ---
  {
    id: "prod-hig-1",
    nombre: "Shampoo Hipoalergénico Avena & Caléndula 500ml",
    categoria: "Higiene",
    precio: 10990,
    imagen:
      "https://images.unsplash.com/photo-1611173622933-91942d394b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 18,
    descripcion:
      "pH neutro formulado para pieles delicadas. Calma irritaciones y deja un aroma natural y suave.",
    tipoMascota: "ambos",
    rating: 4.8,
    reviewsCount: 94,
    sku: "PAT-HIG-001",
  },
  {
    id: "prod-hig-2",
    nombre: "Cepillo Deslanador Ergonómico Quita Pelo Muerto",
    categoria: "Higiene",
    precio: 13990,
    imagen:
      "https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 8,
    descripcion:
      "Reduce la caída de pelo hasta un 90% sin cortar ni dañar la capa superficial del pelaje.",
    tipoMascota: "ambos",
    rating: 4.9,
    reviewsCount: 167,
    sku: "PAT-HIG-002",
    badge: "Recomendado",
  },
  {
    id: "prod-hig-3",
    nombre: "Toallitas Húmedas Biodegradables con Aloe Vera (80 un.)",
    categoria: "Higiene",
    precio: 6490,
    imagen:
      "https://images.unsplash.com/photo-1581887936036-3f4f7f0b6679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    stock: 25,
    descripcion:
      "Para limpieza rápida de patitas, hocico y pelaje después del paseo. Sin alcohol ni parabenos.",
    tipoMascota: "ambos",
    rating: 4.6,
    reviewsCount: 83,
    sku: "PAT-HIG-003",
  },

  // Note: 'Accesorios' is deliberately kept empty to satisfy:
  // "Una categoría vacía mostrando: 'No hay productos disponibles en esta categoría.'"
]

export const INITIAL_USERS: User[] = [
  {
    id: "user-active-1",
    nombre: "María",
    apellido: "González",
    rut: "18.452.123-4",
    email: "maria.patitas@ejemplo.cl",
    direccion: "Av. Providencia 1240, Depto 402, Santiago",
    telefono: "+56 9 8765 4321",
    password: "Patitas2024",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "user-inactive-1",
    nombre: "Juan",
    apellido: "Pérez",
    rut: "16.789.456-K",
    email: "juan.inactivo@ejemplo.cl",
    direccion: "Los Leones 450, Las Condes",
    telefono: "+56 9 9123 4567",
    password: "Patitas2024",
    isActive: false,
    createdAt: "2025-02-10T14:30:00Z",
  },
]

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
export const HERO_SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
