// ArrowButton.tsx
import React from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface ArrowButtonProps {
  onClick: () => void;
  direction: "left" | "right";
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, direction }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "none",
        color: "white",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      icon={direction === "left" ? <LeftOutlined /> : <RightOutlined />}
    />
  );
};

export default ArrowButton;
