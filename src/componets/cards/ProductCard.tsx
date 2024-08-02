// src/components/cards/ProductCard.tsx

import React from "react";
import { Card, Button, Tag } from "antd";

interface Product {
  id: string;
  name: string;
  valor: number;
  tipo_producto: string;
  caracteristicas: string;
  stock: number;
  subtotal: number;
  iva: number;
  estado: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getSeverity = (status: string) => {
    switch (status) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.images[0]} />}
      style={{ width: 240, margin: "16px" }}
    >
      <Card.Meta title={product.name} description={product.tipo_producto} />
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
