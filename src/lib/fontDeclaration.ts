// fonts.js
import localFont from 'next/font/local';

export const geist = localFont({
  src: './path/to/geist-font.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-geist', // Define a CSS variable
  display: 'swap',
});