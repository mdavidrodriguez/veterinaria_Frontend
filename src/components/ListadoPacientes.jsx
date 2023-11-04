import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';


const ListadoPacientes = () => {
  const { pacientes } = usePacientes()



  return (
    <>
             <h2 className='font-black text-3xl text-center'>Listado de Pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
              Administra tus  {""}
              <span className='text-indigo-600 font-bold'> Pacientes y Citas</span>
            </p>
      <div className='flex flex-wrap sm:justify-center md:justify-start justify-center'>
        {pacientes.length ? (
          <>
            {pacientes.map(paciente => (
                  <Paciente
                    key={paciente._id}
                    paciente={paciente}
                  />
              ))}
          </>
        ) :
          (
            <>
              <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2>
              <p className='text-xl mt-5 mb-10 text-center'>
                Comienza agregando pacientes {""}
              </p>
        
            </>
          )}
      </div>
    </>
  )
}

export default ListadoPacientes