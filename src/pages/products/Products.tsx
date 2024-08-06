// Products.tsx
import React, { useEffect, useState } from "react";
import { Col, Row, Tabs } from "antd";
import { products as dataProduct, soldProducts } from "./types";
import TabContent from "../../componets/tabs/TabContent";
import ProductCarousel from "../../componets/galerry/ProductCarousel";
import { useGetProductsQuery } from "../../reducers/productsApi";

const Products: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { data: products, isLoading } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState(products?.productos);
  const [filteredSoldProducts, setFilteredSoldProducts] =
    useState(soldProducts);
  useEffect(() => {
    if (!isLoading && products) {
      setFilteredProducts(products.productos);
    }
  }, [products]);

  console.log(filteredSoldProducts);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = products?.productos?.filter((item) =>
      item.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearchSoldProducts = (value: string) => {
    setSearchText(value);
    const filtered = soldProducts.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSoldProducts(filtered);
  };

  const tabs = [
    {
      key: "1",
      label: "Mis productos",
      children: (
        <TabContent
          products={filteredProducts}
          searchText={searchText}
          handleSearch={handleSearch}
          createdButton={true}
        />
      ),
    },
    {
      key: "2",
      label: "Productos Vendidos",
      children: (
        <TabContent
          products={filteredProducts}
          searchText={searchText}
          handleSearch={handleSearchSoldProducts}
        />
      ),
    },
    {
      key: "3",
      label: "Productos más vendidos",
      children: (
        <Row gutter={16} className="flex justify-center">
          <Col span={18}>
            <h1>Los productos más vendidos</h1>
            <div>
              <ProductCarousel products={products?.productos || dataProduct} />
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <Tabs defaultActiveKey="1" centered items={tabs} />
    </div>
  );
};

export default Products;
