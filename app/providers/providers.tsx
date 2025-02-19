"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";

// In any component:

export function Providers({ children }: { children: React.ReactNode }) {
 
  return <Provider store={store}>{children}</Provider>;
}
