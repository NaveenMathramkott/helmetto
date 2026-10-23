import React from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const TAB_DATA = [
  { name: "Orders", value: "orders" },
  { name: "Profile", value: "profile" },
];

const UserMenu = ({ onClick, active }) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {TAB_DATA.map((tabItem) => (
        <Button
          key={tabItem.value}
          variant={active === tabItem.value ? "default" : "outline"}
          className={cn(
            "w-full justify-start",
            active === tabItem.value && "bg-primary text-primary-foreground",
          )}
          onClick={() => onClick(tabItem.value)}
        >
          {tabItem.name}
        </Button>
      ))}
    </div>
  );
};

export default UserMenu;
