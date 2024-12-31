import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const TotalCartItems = useSelector((state: RootState) =>state?.cart?.cartItemList?.length)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">MyStore</Link>
        </div>

        {/* Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/cart" className="hover:text-gray-400">Cart ({TotalCartItems ?? 0})</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-400">Products</Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-gray-400">Profile</Link>
            </li>
            <li>
              <Link href="/favourites" className="hover:text-gray-400">Favourites</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-2">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/cart" className="hover:text-gray-400">Cart</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-400">Products</Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-gray-400">Profile</Link>
            </li>
            <li>
              <Link href="/favourites" className="hover:text-gray-400">Favourites</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
