import type { Metadata } from 'next';
import './globals.css';
import { ContextProvider } from '@/components/Context/Context';

export const metadata: Metadata = {
  title: 'Social GO',
  description: 'Rede Social criada em GO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ContextProvider>{children}</ContextProvider>
        <footer>Gregory de Almeida &copy;</footer>
      </body>
    </html>
  );
}
