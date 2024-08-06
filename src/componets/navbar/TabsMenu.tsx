import { Button } from "@mui/material";
import React from "react";

/**
 * Tab defines the structure of each tab in the TabsMenu component.
 */
interface Tab {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ElementType<any>; // Reemplaza "any" con el tipo de tus iconos si lo tienes definido
  link: string;
}

/**
 * TabsMenuProps defines the properties expected by the TabsMenu component.
 */
interface TabsMenuProps {
  tabs: Tab[];
}

const TabsMenu: React.FC<TabsMenuProps> = ({ tabs }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {tabs.map((tab) => (
        <Button
          key={tab.name}
          href={tab.link}
          sx={{ color: "white", mx: 1 }}
          startIcon={<tab.icon />}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
};

export default TabsMenu;
