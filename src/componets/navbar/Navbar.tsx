// import { useMediaQuery } from "@react-hook/media-query";
import logo from "../../assets/png/logo.png";
import RoleAvatar from "./RoleAvatar";
import TabsMenu from "./TabsMenu";

const Navbar = () => {
  // const isMobile = useMediaQuery('only screen and (max-width: 767px)');
  return (
    <nav
      className="relative w-full h-[52px] bg-blue-200"
      style={{ backgroundColor: "#088395" }}
    >
      <div className="mx-auto px-2 sm:px-6 lg:px-20 ">
        <div className="relative flex h-13 items-center justify-between">
          <div className="flex items-center justify-between">
            {/* {isMobile && (
              <div className="mr-3 mt-2">
                {userRole === 5 && <MenuMobile tabs={tabsRole0} />}
                {userRole === 6 && <MenuMobile tabs={tabsRole1} />}
                {userRole === 7 && <MenuMobile tabs={tabsRole2} />}
              </div>
            )} */}
            <div className="flex items-center mt-1 flex-row">
              <img className="h-10 w-15 bg-blue-200" src={logo} />
              <h2 className="font-bold text-blue-200 ml-2">MiniMarket</h2>
              <TabsMenu />
            </div>
          </div>
          <div className="flex items-center text-white mt-1">
            <RoleAvatar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
