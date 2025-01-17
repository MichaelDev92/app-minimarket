import React, { useState } from "react";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import ProductForm from "../form/ProductForm";

interface SearchAndButtonProps {
  onSearch: (value: string) => void;
  searchText: string;
  createdButton?: boolean;
}

const SearchAndButton: React.FC<SearchAndButtonProps> = ({
  onSearch,
  searchText,
  createdButton,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between mb-4">
      <div className="flex justify-center w-full mb-4 lg:mb-0">
        <Search
          placeholder="Buscar por nombre"
          enterButton="Buscar"
          size="large"
          onSearch={onSearch}
          onChange={(e) => onSearch(e.target.value)}
          value={searchText}
          className="w-full lg:w-2/3"
        />
      </div>
      {createdButton && (
        <Button
          className="bg-blue-700 text-white hover:bg-blue-600 w-full lg:w-auto lg:ml-4"
          type="primary"
          onClick={openDialog}
        >
          Agregar más Productos
        </Button>
      )}
      {dialogVisible && <ProductForm onHide={closeDialog} />}
    </div>
  );
};

export default SearchAndButton;
