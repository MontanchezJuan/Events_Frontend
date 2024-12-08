const Footer = () => {
  return (
    <footer className="bg-zinc-900 py-4 text-white">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
