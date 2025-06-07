import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Video Prompt Generator - Create Cinematic Product Videos',
  description: 'Generate high-quality AI video prompts for products using RunwayML, Pika Labs, Sora, and other AI video platforms. Perfect for marketing, e-commerce, and product showcases.',
  keywords: 'AI video, prompt generator, RunwayML, Pika Labs, Sora, product videos, marketing, cinematic',
  openGraph: {
    title: 'AI Video Prompt Generator',
    description: 'Create cinematic AI video prompts for your products in seconds',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}