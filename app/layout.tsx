import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'Title',
  description: 'Description',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
