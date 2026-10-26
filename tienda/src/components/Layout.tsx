interface LayoutProps {
  children: React.ReactNode;
  pie: React.ReactNode;
  encabezado: React.ReactNode;
}
export function Layout({ children, pie, encabezado }: LayoutProps) {
  return (
    <div className="tienda">
      {encabezado}
      <main className="contenido">{children}</main>
      {pie}
    </div>
  );
}
