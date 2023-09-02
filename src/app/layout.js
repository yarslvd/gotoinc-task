import './globals.scss'
import { Jost } from 'next/font/google'
import {CssBaseline, Container} from "@mui/material";

import {Providers} from '../redux/provider';

import {Navigation} from "@/components/Navigation/Navigation";

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  title: 'Gotoinc task',
  description: 'Parcel transportation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CssBaseline />
        <body className={jost.className} style={{ height: '100vh'}}>
        <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Navigation />
          <Providers>{children}</Providers>
        </Container>
        </body>
    </html>
  )
}