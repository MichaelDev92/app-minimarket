// src/components/cards/ProductCard.tsx

import React from "react";
import { Card, Button, Tag } from "antd";
import { ProductFormData } from "../form/ProductForm";

// interface Product {
//   id: string;
//   name: string;
//   valor: number;
//   tipo_producto: string;
//   caracteristicas: string;
//   stock: number;
//   subtotal: number;
//   iva: number;
//   estado: string;
//   images: string;
// }

interface ProductCardProps {
  product: ProductFormData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getSeverity = (status: number) => {
    switch (status) {
      case 1:
        return "success";
      case 2:
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.nombre}
          src={
            product.images ||
            "https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />
      }
      style={{ width: 240, margin: "16px" }}
    >
      <Card.Meta title={product.nombre} description={product.tipo_producto} />
      <div style={{ marginTop: 16 }}>
        <h4>${product.valor}</h4>
        {/* <p>Características: {product.caracteristicas}</p>
        <p>Stock: {product.stock}</p>
        <p>Subtotal: ${product.subtotal}</p>
        <p>IVA: ${product.iva}</p> */}
        <Tag color={getSeverity(product.estado)}>{product.estado}</Tag>
        <div style={{ marginTop: 16 }}>
          <Button type="primary">View</Button>
          <Button type="default" style={{ marginLeft: 8 }}>
            Favorite
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
