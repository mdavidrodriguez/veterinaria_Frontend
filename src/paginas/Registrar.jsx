import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Alerta from "../components/Alerta";
import axios from "axios";
import clienteAxios from "../config/axios";
import img from "../img/registro.jpg";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Los password no son iguales", error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }
    if (password.length > 30) {
      setAlerta({
        msg: "El password es muy largo, agrega maximo 30 caracteres",
        error: true,
      });
      return;
    }
    if (nombre.length < 1) {
      setAlerta({
        msg: "El nombre es muy corto, agrega minimo 1 caracteres",
        error: true,
      });
      return;
    }
    else if(nombre.length > 15) {
      setAlerta({
        msg: "El nombre es muy largo, agrega maximo 15 caracteres",
        error: true,
      });
      return;
    } 
    if(email.length < 8) {
      setAlerta({
        msg: "El email es muy corto, agrega minimo 8 caracteres",
        error: true,
      });
      return;
    }
    else if(email.length > 60) {
        setAlerta({
        msg: "El email es muy largo, agrega maximo 30 caracteres",
        error: true,
      });
      return;
    }
    else if(email.includes("@") === false || email.includes(".") === false) {
      setAlerta({
        msg: "El email no es valido",
        error: true,
      });
      return;
    } 
    setAlerta({});

    // Crear el usuario en la API
    try {
      await clienteAxios.post(`/veterinarios`, { nombre, email, password });
      setAlerta({
        msg: "Creado correctamente, revisa tu email",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="md:-mt-52 min-[300px]:-mb-20">
        <h1 className="text-orange-500 text-center mb-6 font-black text-6xl">
          Crear Cuenta
        </h1>
        <img className="border-orange-500 md:ml-14" src={img} alt="" />
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-indigo-800">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-300 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-200 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-300 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-300 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-green-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-green-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-400" to="/">
            Ya tienes una cuenta?{" "}
            <span className="text-orange-500 underline">Inicia Sesion</span>
          </Link>
          <Link
            className="block text-center my-5 text-gray-400"
            to="/olvide-password"
          >
            <span className="text-orange-500 underline">
              Olvide Mi password
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
