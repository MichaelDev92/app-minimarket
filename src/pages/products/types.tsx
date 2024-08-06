import { MenuProps } from "antd";
import image from "../../assets/png/login-market.png";
import { UnorderedListOutlined } from "@ant-design/icons";
import { ProductFormData } from "../../componets/form/ProductForm";

export interface Product {
  id: string;
  name: string;
  valor: number;
  tipo_producto: string;
  caracteristicas: string;
  stock: number;
  subtotal: number;
  iva: number;
  estado: string;
  images: string;
}

export const categories = [
  { id: 0, descripcion: "Tecnología", estado: 1 },
  { id: 1, descripcion: "Electrodomésticos", estado: 1 },
  { id: 2, descripcion: "Hogar", estado: 0 },
  { id: 3, descripcion: "Ropa", estado: 1 },
  { id: 4, descripcion: "Salud y Belleza", estado: 2 },
  { id: 5, descripcion: "Deportes", estado: 1 },
  { id: 6, descripcion: "Automotriz", estado: 0 },
  { id: 7, descripcion: "Juguetes", estado: 1 },
  { id: 8, descripcion: "Libros", estado: 1 },
  { id: 9, descripcion: "Alimentos", estado: 2 },
  { id: 10, descripcion: "Oficina", estado: 1 },
  { id: 11, descripcion: "Viajes", estado: 1 },
  { id: 12, descripcion: "Bebés", estado: 0 },
  { id: 13, descripcion: "Papelería", estado: 1 },
  { id: 14, descripcion: "Juegos", estado: 1 },
];

export const products: ProductFormData[] = [
  {
    nombre: "Producto 1",
    valor: 100,
    tipo_producto: 1,
    caracteristicas: "Característica 1",
    stock: 10,
    subtotal: 90,
    iva: 10,
    estado: 1,
    images: image,
  },
  {
    nombre: "Producto 1",
    valor: 100,
    tipo_producto: 1,
    caracteristicas: "Característica 1",
    stock: 10,
    subtotal: 90,
    iva: 10,
    estado: 1,
    images: image,
  },
  {
    nombre: "Producto 1",
    valor: 100,
    tipo_producto: 1,
    caracteristicas: "Característica 1",
    stock: 10,
    subtotal: 90,
    iva: 10,
    estado: 1,
    images: image,
  },
];

export const soldProducts: Product[] = [
  {
    id: "5",
    name: "Producto Vendido 1",
    valor: 200,
    tipo_producto: "Tipo 5",
    caracteristicas: "Característica 5",
    stock: 0,
    subtotal: 180,
    iva: 20,
    estado: "Vendido",
    images: image,
  },
  {
    id: "6",
    name: "Producto Vendido 2",
    valor: 250,
    tipo_producto: "Tipo 6",
    caracteristicas: "Característica 6",
    stock: 0,
    subtotal: 225,
    iva: 25,
    estado: "Vendido",
    images:
      "https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const items: MenuProps["items"] = [
  {
    key: "sub1",
    label: "Categorias",
    icon: <UnorderedListOutlined />,
    children: categories
      .filter((category) => category.estado === 1)
      .map((category) => ({
        key: category.id.toString(),
        label: category.descripcion,
      })),
  },
];
