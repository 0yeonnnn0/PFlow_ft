import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { LButton } from "./LButton";
import { useState, useEffect } from "react";
import DummyProfile from "../assets/DummyProfile.jpeg";
import LogoImg from "../assets/Logo.jpeg";
import { createProject } from "../services/projectAPIs";

const navigation = [
  { name: "About", href: "/about", current: false },
  { name: "Results", href: "/results", current: false },
];

const loggedInNavigation = [
  ...navigation,
  { name: "Projects", href: "/all-projects", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ userData }) {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  const handleNewProject = async () => {
    try {
      let newProject = await createProject(); // 프로젝트 생성
      navigate(`/project/${newProject._id}`); // 생성된 프로젝트 ID로 이동
    } catch (error) {
      console.error("Error creating project:", error); // 에러 처리
    }
  };

  const currentNavigation = isLoggedIn ? loggedInNavigation : navigation;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="PFlow"
                src={LogoImg}
                className="h-10 w-auto cursor-pointer"
                onClick={() => (window.location.href = "/")} // 홈으로 새로고침하여 이동
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-6">
                {currentNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 font-semibold" // 글자 크기와 굵기 조정
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex gap-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {isLoggedIn ? (
              <>
                <LButton
                  contents={"New Project"}
                  onClick={() => {
                    handleNewProject();
                  }}
                />
                <Menu as="div" className="relative w-20">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="profile pic"
                        src={DummyProfile}
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href={`/user/${userData._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              // if user is not logged in
              <LButton
                onClick={() => navigate("/login")}
                contents={"Get Started!"}
              />
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {currentNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
