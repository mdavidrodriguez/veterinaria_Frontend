import usePacientes from "../hooks/usePacientes"
import { useNavigate } from "react-router-dom"


const Paciente = ({ paciente }) => {
  const navigate = useNavigate();
  

  const {setEdicion, eliminarPaciente} = usePacientes()
 
  const { email, fecha, nombre,raza,telefono, especie,peso, propietario, sintomas, _id } = paciente

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha)
  }
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-5 w-96 flex  flex-col">
      <p className="font-bold uppercase text-indigo-700">Nombre : {""}
        <span className="font-normal normal-case text-black my-2">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Propietario : {""}
        <span className="font-normal normal-case text-black my-2 whitespace-normal break-words">{propietario}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Telefono : {""}
        <span className="font-normal normal-case text-black my-2">{telefono}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Especie : {""}
        <span className="font-normal normal-case text-black my-2">{especie} </span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Raza : {""}
        <span className="font-normal normal-case text-black my-2">{raza}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Peso : {""}
        <span className="font-normal normal-case text-black my-2">{peso} kg</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Email de Contacto: {""}
        <span className="font-normal normal-case text-black my-2">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Fecha de Alta : {""}
        <span className="font-normal normal-case text-black my-2">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Sintomas : {""}
        <span className="font-normal normal-case text-black my-2">{sintomas}</span>
      </p>
      <div className="flex justify-between my-5">
      <button
        type="button"
        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
        onClick={() => {
          setEdicion(paciente);
          navigate("/admin");
        }}
      >
        Editar
      </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
          onClick={() => eliminarPaciente(_id)}
          >
          Eliminar
          
        </button>
      </div>
    </div>
  )
}

export default Paciente