// src/pages/Products.tsx
import React, { useState } from "react";
import { Col, Row, Tabs } from "antd";
import ProductCarousel from "../../componets/galerry/ProductCarousel";
import TabContent from "../../componets/tabs/TabContent";
import { products, soldProducts } from "./types";

const Products: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filteredSoldProducts, setFilteredSoldProducts] =
    useState(soldProducts);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
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
        />
      ),
    },
    {
      key: "2",
      label: "Productos Vendidos",
      children: (
        <TabContent
          products={filteredSoldProducts}
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
          {/* <Col span={6}>
            <Menu
              // You might want to pass `items` and `onClick` from the parent component
              onClick={(e) => console.log("click ", e)}
              style={{ width: 256 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </Col> */}
          <Col span={18} className="">
            <h1>Los productos más vendidos</h1>
            <div className="">
              <div>
                <ProductCarousel products={products} />
              </div>
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Tabs defaultActiveKey="1" centered items={tabs} />
    </div>
  );
};

export default Products;
