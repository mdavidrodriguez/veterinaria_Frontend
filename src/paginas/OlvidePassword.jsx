import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})




    const handleSubmit = async e => {
        e.preventDefault()

        if (email === '' || email.length < 8) {
            setAlerta({ msg: 'El email es obligatorio', error: true })
            return
        }
        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password',{email})
            console.log(data);

            setAlerta({msg: data.msg})
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const {msg} = alerta
    return (
        <>
            <div>
                <h1 className="text-orange-600 font-black text-6xl">Restablecer Clave {""}<span className="text-black shadow-transparent hover:text-indigo-500">de la cuenta</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-indigo-900">
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-300 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Enviar Intrucciones" className="bg-green-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-green-800 md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-400"
                        to="/">Ya tienes una cuenta?<span className="text-orange-500 underline"> Inicia Sesion</span></Link>
                    <Link
                        className="block text-center my-5 text-gray-400"
                        to="/registrar">No tienes una cuenta? <span className="text-orange-500 underline">Registrarse</span></Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword