import React, { useState } from "react";
import LinkComponent from "./LinkComponent";
import { MenuIcon } from "@heroicons/react/solid";
import NavbarButtons from "./Navbar/NavbarButtons";
import LoginButton from "./LoginButton";
import { useLogoutUserMutation, useMeQuery } from "../generated/graphql";
import { isServerSide } from "../utils/isServerSide";
import { useRouter } from "next/router";

interface NavbarComponentProps {}

const NavbarProvider: React.FC<NavbarComponentProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [, logout] = useLogoutUserMutation();
  const router = useRouter();

  // TODO: Use Redux or the Context API to reduce the amount of queries
  const [{ fetching: userDataFetching, data: userData }] = useMeQuery({
    pause: isServerSide(),
  });

  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div className="h-auto md:h-full flex flex-col md:flex-row overflow-hidden">
        <div className="h-full md:h-full rounded px-5 py-3 bg-zinc-900 text-white">
          <div className="h-full flex flex-row md:flex-col align-middle items-center justify-between gap-y-5">
            <span className="flex gap-x-3 md:flex-col">
              <LinkComponent className="md:text-xl btn btn-effect" href="/">
                Home
              </LinkComponent>
              {userDataFetching || !userData?.me ? (
                <LoginButton className="md:text-xl btn btn-effect" />
              ) : (
                <button
                  onClick={() => {
                    logout();
                    router.reload();
                  }}
                  className="md:text-xl btn btn-effect"
                >
                  Logout
                </button>
              )}
            </span>
            <div className="md:hidden">
              <button className="btn" onClick={() => setShowMenu(!showMenu)}>
                <MenuIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="hidden md:block">
              <span className="flex justify-center flex-col align-middle items-start">
                <NavbarButtons className="md:text-xl btn btn-effect" />
              </span>
            </div>
          </div>
          {showMenu && (
            <div className="md:hidden">
              <hr />
              <div className="flex justify-start flex-col items-start">
                <NavbarButtons className="md:text-xl btn btn-effect" />
              </div>
            </div>
          )}
        </div>
        <div className="overflow-y-auto flex-grow px-5 md:px-16 py-8">{children}</div>
      </div>
    </div>
  );
};

export default NavbarProvider;
