"use client"
 
import * as React from "react"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider, ThemeProvider} from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const NextAuthProvider = ({children, ...props}: React.ComponentProps<typeof NextThemesProvider>)=>{
    return(
        <QueryClientProvider client={queryClient}>
<ThemeProvider
 attribute='class' 
 defaultTheme="system" 
 enableSystem>
<SessionProvider>{children}</SessionProvider>
</ThemeProvider>
</QueryClientProvider>
    )
}

export default NextAuthProvider