import {
  Calendar,
  Home,
  Package,
  List,
  FolderPlus,
  Tags,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Updated menu items structure
const items = [
  {
    title: "Products",
    icon: Package,
    subItems: [
      {
        title: "Create Product",
        url: "/admin/products/create",
        icon: FolderPlus,
      },
      {
        title: "Product List",
        url: "/admin/products/list",
        icon: List,
      },
    ],
  },
  {
    title: "Categories",
    icon: Tags,
    subItems: [
      {
        title: "Create Category",
        url: "/admin/category/create",
        icon: FolderPlus,
      },
      {
        title: "Category List",
        url: "/admin/category/list",
        icon: List,
      },
    ],
  },
  {
    title: "Brands",
    icon: Tags,
    subItems: [
      {
        title: "Create Brand",
        url: "/admin/brand/create",
        icon: FolderPlus,
      },
      {
        title: "Brand List",
        url: "/admin/brand/list",
        icon: List,
      },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();

  // Mock user data - replace with your actual user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png" // example avatar URL
  }

  const handleLogout = () => {
    try {
      // Remove specific cookies
      Cookies.remove('token');
      Cookies.remove('user');
      // ... any other auth-related cookies
      
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Sidebar className="flex flex-col justify-between h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu className="ml-4 mt-2">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={subItem.url}>
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* New footer section */}
      <div className="border-t p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-3 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>My Account</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              <Button variant="ghost" className="flex items-center gap-2 justify-start">
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Sidebar>
  );
}
