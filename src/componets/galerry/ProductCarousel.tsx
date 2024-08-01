/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, Carousel } from "antd";
import ProductCard from "../cards/ProductCard"; // Asegúrate de ajustar la ruta
import ArrowButton from "../buttons/ArrowButton"; // Asegúrate de ajustar la ruta
import Meta from "antd/es/card/Meta";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inventoryStatus: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <Carousel
      autoplay
      arrows
      slidesToShow={3}
      slidesToScroll={1}
      infinite
      style={{ width: "100%" }}
      className="bg-gray-200"
    >
      {products.map((product) => (
        <div key={product.id} className="p-2">
          <Card
            hoverable
            cover={<img alt={product.name} src={product.image} />}
            style={{ width: 150 }} // Ajusta el ancho de las tarjetas según sea necesario
          >
            <Meta title={product.name} description={`$${product.price}`} />
          </Card>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
