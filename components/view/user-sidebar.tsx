import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, Menu, Search } from 'lucide-react';
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='p-6 flex flex-col gap-3'>
      {/* Brands Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 font-bold">
            {/* <Search className="h-4 w-4" /> */}
            <span>Brands</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="ml-4 mt-2">
            <div>Brand 1</div>
            <div>Brand 2</div>
            <div>Brand 3</div>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      {/* Categories Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center  gap-2 font-bold">
            <span>Categories</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="ml-4 mt-2">
            <div>Category 1</div>
            <div>Category 2</div>
            <div>Category 3</div>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center  gap-2 font-bold">
            <span>Price</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="ml-4 mt-2">
            <div>Price Range 1</div>
            <div>Price Range 2</div>
            <div>Price Range 3</div>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      {/* Ratings Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center  gap-2 font-bold">
            <span>Ratings</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="ml-4 mt-2">
            <div>Rating 1</div>
            <div>Rating 2</div>
            <div>Rating 3</div>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default UserSidebar;