import React from "react";
import { Card, Button, Tag } from "antd";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inventoryStatus: string;
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
      cover={<img alt={product.name} src={product.image} />}
      style={{ width: 240, margin: "16px" }}
    >
      <Card.Meta title={product.name} description={product.description} />
      <div style={{ marginTop: 16 }}>
        <h4>${product.price}</h4>
        <Tag color={getSeverity(product.inventoryStatus)}>
          {product.inventoryStatus}
        </Tag>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" icon="search">
            View
          </Button>
          <Button type="default" icon="star" style={{ marginLeft: 8 }}>
            Favorite
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
