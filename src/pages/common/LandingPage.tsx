
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Imagen de fondo que ocupa la mitad de la pantalla */}
      <div className="relative bg-cover bg-center h-1/2" style={{ backgroundImage: "url('https://web.tuboleta.com/images/Eventos/core-medellin/images/tittle.png')" }}>
        {/* Contenido principal */}
        <div className="flex-grow">
          {/* Aquí puedes agregar más contenido si es necesario */}
        </div>
      </div>

      {/* Sección de filtros */}
      <div className="flex flex-col items-center bg-black text-white py-5 w-full">
        <div className="bg-white p-4 rounded-lg w-full max-w-screen-lg">
          <div className="flex space-x-4">
            <input className="p-2 rounded bg-black text-white w-full" placeholder="Buscar" />
            <select className="p-2 rounded bg-black text-white w-full">
              <option value="">ciudad</option>
              <option value="medellin">Medellín</option>
              <option value="bogota">Bogotá</option>
            </select>
            <select className="p-2 rounded bg-black text-white w-full">
              <option value="">fecha</option>
              <option value="feb">Febrero</option>
              <option value="mar">Marzo</option>
            </select>
            <input type="date" className="p-2 rounded bg-black text-white w-full" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;