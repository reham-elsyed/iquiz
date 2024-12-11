"use client"
 
import * as React from "react"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider, ThemeProvider} from "next-themes";
const NextAuthProvider = ({children, ...props}: React.ComponentProps<typeof NextThemesProvider>)=>{
    return(
<ThemeProvider attribute='class' defaultTheme="system" enableSystem>
<SessionProvider>{children}</SessionProvider>
</ThemeProvider>
    )
}

export default NextAuthProvider