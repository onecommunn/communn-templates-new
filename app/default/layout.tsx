// app/default/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // keep this minimal; no custom props allowed
  return <>{children}</>;
}
