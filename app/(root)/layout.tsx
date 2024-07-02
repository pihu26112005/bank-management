
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // sidebar
    <main>
      {children}
    </main>
  );
}
