// src/components/TabContent.tsx
import React from "react";
import { Col, Menu, Row } from "antd";
import ProductCard from "../cards/ProductCard";
import SearchAndButton from "../buttons/SearchAndButton";
import { items, Product } from "../../pages/products/types";

interface TabContentProps {
  products: Product[];
  searchText: string;
  handleSearch: (value: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  products,
  searchText,
  handleSearch,
}) => (
  <Row gutter={16}>
    <Col span={6}>
      <div className="bg-white" style={{ width: 256, height: "100vh" }}>
        <Menu
          // You might want to pass `items` and `onClick` from the parent component
          items={items}
          onClick={(e) => console.log("click ", e)}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="bg-white"
        />
      </div>
    </Col>
    <Col span={18}>
      <div className="mb-4">
        <SearchAndButton onSearch={handleSearch} searchText={searchText} />
        <Row gutter={16} justify="center">
          {products.map((product) => (
            <Col span={8} key={product.id} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </Col>
  </Row>
);

export default TabContent;
