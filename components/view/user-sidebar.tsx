import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setPricerange,
  setBrands,
  setCategories,
  setRatings,
  clearFilter,
} from "@/store/features/filterSlice";
import { RootState } from "@/store/store";
import { useBrands } from "@/hooks/queries/use-brands";
import { Brand, Category } from "@/types/products";
import { Checkbox } from "@/components/ui/checkbox";
import { BRAND } from "zod";
import { useCategories } from "@/hooks/queries/use-categories";

const UserSidebar = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const selectedRating = useSelector(
    (state: RootState) => state.filter.ratings
  );
  const selectedCategories = useSelector(
    (state: RootState) => state.filter.categorries
  );
  const selectedBrands = useSelector((state: RootState) => state.filter.brands);
  const { data: brands = [], isLoading: brandLoader } = useBrands();
  const { data: categories = [], isLoading: categoryLoader } = useCategories();

  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const toggleSidebar = () => {
    // setIsOpen(!isOpen);
  };

  const handleRatingSelect = (rating: number) => {
    dispatch(setRatings({ ratings: rating }));
    console.log(`Selected Rating: ${rating}`);
  };

  const handleBrandSelect = (brandId: number) => {
    const updatedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];
    dispatch(setBrands({ brands: updatedBrands }));
  };

  const handleCategorySelect = (category: number) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    dispatch(setCategories({ categories: updatedCategories }));
  };

  //   const handleShowResults = () => {
  //     dispatch(
  //       setFilter({
  //         priceRange: priceRange,
  //         ratings: selectedRating,
  //         categories: selectedCategories,
  //         brands: selectedBrands,
  //       })
  //     );
  //   };

  const handleClearFilter = () => {
    dispatch(clearFilter({}));
    setLocalPriceRange([0,500])
  };

  const handleSliderChange = (newValue: [number, number]) => {
    setLocalPriceRange(newValue);
  };

  const handleSliderCommit = (newValue: [number, number]) => {
    dispatch(setPricerange({ priceRange: newValue }));
  };

  return (
    <div className="p-6 flex flex-col gap-3">
      {/* Brands Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 font-bold">
            <span>Brands</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="ml-4 mt-2">
            {brandLoader ? (
              <div>Loading...</div>
            ) : (
              brands?.brands?.map((brand: Brand) => (
                <div key={brand.id} className="flex items-center">
                  <Checkbox
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => handleBrandSelect(brand.id)}
                  />
                  <span className="ml-2">{brand.name}</span>
                </div>
              ))
            )}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      {/* Categories Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 font-bold">
            <span>Categories</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="ml-4 mt-2">
            {brandLoader ? (
              <div>Loading...</div>
            ) : (
              <>
                {categories?.categories?.map((category: Category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategorySelect(category.id)}
                    />
                    <span className="ml-2">{category.name}</span>
                  </div>
                ))}
              </>
            )}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Section */}
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 font-bold">
            <span>Price</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-2">
            <h3>Price Range</h3>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={localPriceRange}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              className="py-2"
            />
            <div>
              Selected Price Range: ${localPriceRange[0]} - $
              {localPriceRange[1]}
            </div>
          </div>
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
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= selectedRating!
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRatingSelect(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      <div className="pt-3 flex justify-end">
        {/* <Button onClick={handleShowResults}>Show Results</Button> */}
        <Button onClick={handleClearFilter}>Clear Filter</Button>
      </div>
    </div>
  );
};

export default UserSidebar;
