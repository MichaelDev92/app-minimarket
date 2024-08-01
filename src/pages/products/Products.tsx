import ProductCarousel from "../../componets/galerry/ProductCarousel";
import image from "../../assets/png/login-market.png";
import { Button, Col, Row, Tabs } from "antd";
import ProductCard from "../../componets/cards/ProductCard";

const { TabPane } = Tabs;
const Products: React.FC = () => {
  const products = [
    {
      id: "1",
      name: "Producto 1",
      description: "Descripción del producto 1",
      image: image,
      price: 100,
      inventoryStatus: "INSTOCK",
    },
    {
      id: "2",
      name: "Producto 2",
      description: "Descripción del producto 2",
      image:
        "https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 150,
      inventoryStatus: "LOWSTOCK",
    },
    {
      id: "3",
      name: "Producto 3",
      description: "Descripción del producto 3",
      image:
        "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 100,
      inventoryStatus: "INSTOCK",
    },
    {
      id: "4",
      name: "Producto 4",
      description: "Descripción del producto 4",
      image:
        "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 150,
      inventoryStatus: "LOWSTOCK",
    },
  ];

  const soldProducts = [
    // Puedes agregar productos vendidos aquí
    {
      id: "5",
      name: "Producto Vendido 1",
      description: "Descripción del producto vendido 1",
      image: image,
      price: 200,
      inventoryStatus: "SOLD",
    },
    {
      id: "6",
      name: "Producto Vendido 2",
      description: "Descripción del producto vendido 2",
      image:
        "https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 250,
      inventoryStatus: "SOLD",
    },
  ];

  return (
    <div className="flex flex-col items-center p-4">
      {/* Carrusel en la parte superior */}

      {/* Tabs debajo del carrusel */}
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Mis productos" key="1">
          <div className="flex justify-end">
            <Button className="bg-blue-700 text-white hover:bg-blue-200">
              Agregar más Productos
            </Button>
          </div>
          <Row gutter={16} justify="center">
            {products.map((product) => (
              <Col span={8} key={product.id} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Productos Vendidos" key="2">
          <Row gutter={16} justify="center">
            {soldProducts.map((product) => (
              <Col span={8} key={product.id} className="mb-4 ml-8">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Productos más vendidos" key="3">
          <h1>Los productos más vendidos</h1>
          <div className="w-full max-w-4xl mb-8">
            <ProductCarousel products={products} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Products;
