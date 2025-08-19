import { useState } from 'react';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarLogo,
  NavItems,
} from '@/components/ui/resizable-navbar';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  const navItems = [
    { name: 'Home', link: '/', key: 'home' },
    { name: 'Main Thread Demo', link: '/main-thread', key: 'main-thread' },
    { name: 'Web Worker Demo', link: '/web-worker', key: 'web-worker' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="relative flex items-center gap-2">
            <ModeToggle />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ModeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <a
                className="relative text-neutral-600 dark:text-neutral-300"
                href={item.link}
                key={item.key}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
