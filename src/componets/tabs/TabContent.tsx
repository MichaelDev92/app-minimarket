// TabContent.tsx
import React from "react";
import { Col, Menu, Row } from "antd";
import ProductCard from "../cards/ProductCard";
import SearchAndButton from "../buttons/SearchAndButton";
import { items, Product } from "../../pages/products/types";

interface TabContentProps {
  products: Product[];
  searchText: string;
  handleSearch: (value: string) => void;
  createdButton?: boolean;
}

const TabContent: React.FC<TabContentProps> = ({
  products,
  searchText,
  handleSearch,
  createdButton,
}) => (
  <Row gutter={16}>
    <Col span={24} md={6} className="overflow-auto">
      <div className="bg-white h-full">
        <Menu
          items={items}
          onClick={(e) => console.log("click ", e)}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="bg-white"
        />
      </div>
    </Col>
    <Col span={24} md={18}>
      <div className="mb-4">
        <SearchAndButton
          onSearch={handleSearch}
          searchText={searchText}
          createdButton={createdButton ? createdButton : false}
        />
        <Row gutter={16} justify="center">
          {products.map((product) => (
            <Col span={24} md={8} key={product.id} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </Col>
  </Row>
);

export default TabContent;
