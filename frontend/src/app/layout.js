import "./globals.css";

export const metadata = {
  title: "GaragemCar",
  description: "Aluguel de garagens e vagas particulares",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topbar">
          <a href="/" className="logo">
            GaragemCar
          </a>
          <nav>
            <a href="/">Buscar vagas</a>
            <a href="/anunciar">Anunciar vaga</a>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
