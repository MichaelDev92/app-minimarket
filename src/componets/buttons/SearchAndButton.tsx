// src/components/SearchAndButton.tsx
import React from "react";
import { Button } from "antd";
import Search from "antd/es/input/Search";

interface SearchAndButtonProps {
  onSearch: (value: string) => void;
  searchText: string;
}

const SearchAndButton: React.FC<SearchAndButtonProps> = ({
  onSearch,
  searchText,
}) => (
  <div className="flex justify-between mb-4">
    <div className="flex justify-center w-full">
      <Search
        placeholder="Buscar por nombre"
        enterButton="Buscar"
        size="large"
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
        value={searchText}
        style={{ width: 400 }}
      />
    </div>
    <Button
      className="bg-blue-700 text-white hover:bg-blue-600 ml-4"
      type="primary"
    >
      Agregar más Productos
    </Button>
  </div>
);

export default SearchAndButton;
