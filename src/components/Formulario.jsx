import { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes";
import Alerta from "./Alerta";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [peso, setPeso] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);
  const [otraEspecie, setOtraEspecie] = useState("");

  const [alerta, setAlerta] = useState({});
  const { guardarPaciente, paciente } = usePacientes();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (telefono.length < 10) {
      setAlerta({
        msg: "El numero de telefono es muy corto",
        error: true,
      });
      return;
    }
    if (peso.length < 1 || peso.length > 100) {
        setAlerta({
            msg: "El peso es incorrecto",
            error: true,
          });
          return;
    }
    if (especie.length < 1 || especie === "Seleccione una especie" || especie.length > 30) {
      setAlerta({
        msg: "La especie es incorrecta",
        error: true,
      });
      return;
    }
      
    if(email.length < 8 ){
        setAlerta({
            msg: "El email es incorrecto",
            error: true,
          });
          return;
    }
    else if(email.length > 60){
        setAlerta({
            msg: "El email es muy largo",
            error: true,
          });
          return;
    }
    if(propietario.length <1 ){
        setAlerta({
            msg: "El nombre del propietario es incorrecto",
            error: true,
          });
          return;
      }
      else if(propietario.length > 30){
        setAlerta({
            msg: "El nombre del propietario es muy largo",
            error: true,
          });
          return;
      }
      if(sintomas.length <1 || sintomas.length > 100){
        setAlerta({
            msg: "La descripcion del sintoma no es correcta, verifique la cantidad de caracteres",
            error: true,
          });
          return;
      }

    if (especie === "Otro") {
      if (!otraEspecie) {
        setAlerta({
          msg: "Por favor, especifique la otra especie",
          error: true,
        });
        return;
      }
      
      guardarPaciente({
        nombre,
        propietario,
        telefono,
        especie: otraEspecie,
        raza,
        peso,
        email,
        fecha,
        sintomas,
        id,
      });
    } else {
      guardarPaciente({
        nombre,
        propietario,
        telefono,
        especie,
        raza,
        peso,
        email,
        fecha,
        sintomas,
        id,
      });
    }

    setNombre("");
    setPropietario("");
    setTelefono("");
    setRaza("");
    setEspecie("");
    setPeso("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");
    setAlerta({
      msg: "Guardado correctamente",
    });
    window.location.reload();
    setTimeout(() => {
      navigate("/admin/listado");
    }, 2000);
  };

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setTelefono(paciente.telefono);
      setEspecie(paciente.especie);
      setRaza(paciente.raza);
      setPeso(paciente.peso);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const { msg } = alerta;

  return (
    <>
      <p className="text-xl mb-3 text-center font-bold ">
        Agrega tus mascotas y{" "}
        <span className="text-indigo-600 font-bold">adminístralas</span>
      </p>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="flex flex-wrap md:-mx-52 justify-center items-center bg-white py-10 px-5 mb-20 lg:mb-5 shadow-md rounded-md max-w-4xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="nombre"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Nombre Mascota
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="propietario"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Nombre Propietario
            </label>
            <input
              id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
              
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="telefono"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Telefono Propietario
            </label>
            <input
              id="telefono"
              type="number"
              placeholder="Numero de telefono"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={telefono}
              
              onChange={(e) => setTelefono(e.target.value)}
              
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="email"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="especie"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Especie
            </label>
            <select
              id="especie"
              className="border-2 w-full p-2 mt-2 rounded-md focus:outline-none focus:border-indigo-600"
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
            >
              <option value="">Seleccione una especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Conejo">Conejo</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          {especie === "Otro" && (
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
              <label
                htmlFor="otraEspecie"
                className="text-gray-700 uppercase font-bold block mb-2"
              >
                Otra especie
              </label>
              <input
                id="otraEspecie"
                type="text"
                placeholder="Especia mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
                value={otraEspecie}
                onChange={(e) => setOtraEspecie(e.target.value)}
              />
            </div>
          )}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="raza"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Raza
            </label>
            <input
              id="raza"
              type="text"
              placeholder="Tipo de raza"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="peso"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Peso
            </label>
            <input
              id="peso"
              type="number"
              placeholder="Peso de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="fecha"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Fecha Alta
            </label>
            <input
              id="fecha"
              type="date"
              className="border-2 w-full p-2 mt-2 rounded-md focus:outline-none focus:border-indigo-600"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="w-full px-4 mb-5">
            <label
              htmlFor="sintomas"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Síntomas
            </label>
            <textarea
              id="sintomas"
              placeholder="Describe los síntomas"
              className="border-2 w-full p-2 mt-2 h-20 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600 resize-none"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center w-full px-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id ? "Guardar Cambios" : "Agregar Paciente"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Formulario;
