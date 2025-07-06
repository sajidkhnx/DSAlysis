import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'Dashboard', href: '/charts', current: false },
  { name: 'Sheet', href: '/sheet', current: false },
  { name: 'Insider-Ai', href: '/gemini', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar1() {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("dsa_jwt"));
  const handleLogout = () => {
    localStorage.removeItem("dsa_jwt");
    window.location.href = "/home";
  };
  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-[#0a192f] via-[#13123f] to-[#020714] shadow-lg border-b border-blue-900/40">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-blue-200 hover:bg-blue-900/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center gap-3">
              <img
                alt="DSAlytics Logo"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c8.svg"
                className="h-10 w-10 drop-shadow-lg animate-bounce-slow"
              />
              <span className="hidden md:inline-block text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">DSAlytics</span>
            </div>
            <div className="hidden sm:ml-20 sm:block">
            <div className="flex space-x-2">
              {isLoggedIn ? (
                navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    className={classNames(
                      location.pathname === item.href ? 'bg-blue-900/80 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                      'rounded-lg px-4 py-2 text-base font-semibold transition-all duration-150',
                    )}
                  >
                    {item.name}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="/login"
                    className={classNames(
                      location.pathname === "/login" ? 'bg-blue-900/80 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                      'rounded-lg px-4 py-2 text-base font-semibold transition-all duration-150',
                    )}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className={classNames(
                      location.pathname === "/signup" ? 'bg-blue-900/80 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                      'rounded-lg px-4 py-2 text-base font-semibold transition-all duration-150',
                    )}
                  >
                    Signup
                  </a>
                </>
              )}
            </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 shadow-lg"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown or Sign out */}
            {isLoggedIn && (
              <>
                <a
                  href="/profile"
                  className="ml-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-blue-100 hover:text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-gradient-to-br from-pink-600 to-blue-900 text-white hover:text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-gradient-to-r from-[#0a192f] via-[#312e81] to-[#2563eb] border-t border-blue-900/40">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {isLoggedIn ? (
            navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={classNames(
                  location.pathname === item.href ? 'bg-blue-900/80 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                  'block rounded-lg px-4 py-2 text-base font-semibold transition-all duration-150',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))
          ) : (
            <>
              <DisclosureButton
                as="a"
                href="/login"
                className={classNames(
                  location.pathname === "/login" ? 'bg-blue-900/80 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                  'block rounded-lg px-4 py-2 text-base font-semibold transition-all duration-150',
                )}
              >
                Login
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href="/signup"
                className={classNames(
                  location.pathname === "/signup" ? 'bg-blue-900/80 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                  'block rounded-lg px-4 py-2 text-base font-semibold transition-all duration-150',
                )}
              >
                Signup
              </DisclosureButton>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
