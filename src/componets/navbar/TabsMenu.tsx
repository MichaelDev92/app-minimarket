import React from "react";
import { TabMenu } from "primereact/tabmenu";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // O cualquier otro tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { MenuItem } from "primereact/menuitem";

const TabsMenu = () => {
  const items: MenuItem[] = [
    { label: "Dashboard", icon: "pi pi-home" },
    { label: "Transactions", icon: "pi pi-chart-line" },
    { label: "Products", icon: "pi pi-list" },
    { label: "Messages", icon: "pi pi-inbox" },
  ];

  return (
    <div className="card">
      <TabMenu model={items} className="flex flex-row space-x-4" />
    </div>
  );
};

export default TabsMenu;
