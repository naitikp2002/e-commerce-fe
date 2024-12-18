// import Sidebar from "@/components/view/sidebar";
// import { Grid2 as Grid } from "@mui/material";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     // <div className="flex flex-row w-[100vw] h-full">
//     <Grid container>
//       <Grid size={2.5}>
//         <Sidebar />
//       </Grid >
//       <Grid size={9.5}>{children}</Grid>
//       </Grid>
//     // </div>
//   );
// }
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/view/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
