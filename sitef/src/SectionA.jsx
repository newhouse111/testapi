// SectionA.jsx
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./SectionA.css";

// Conecta ao servidor Socket.IO
const socket = io("http://localhost:3001");

function SectionA() {
  const [contador1, setContador1] = useState(0);
  const [contador2, setContador2] = useState(0);

  useEffect(() => {
    // Recebe os contadores iniciais do servidor ao conectar
    socket.on("initialCounters", (data) => {
      setContador1(data.contador1);
      setContador2(data.contador2);
    });

    // Atualiza os contadores quando o servidor emite uma atualização
    socket.on("contadorAtualizado", (data) => {
      setContador1(data.contador1);
      setContador2(data.contador2);
    });

    // Limpa os eventos ao desmontar o componente
    return () => {
      socket.off("initialCounters");
      socket.off("contadorAtualizado");
    };
  }, []);

  // Envia eventos para incrementar os contadores
  const incrementarBotao1 = () => {
    socket.emit("incrementarBotao1");
  };

  const incrementarBotao2 = () => {
    socket.emit("incrementarBotao2");
  };

  return (
    <div className="section-container">
      <h1>Escolha seu botão e clique!</h1>

      {/* Botão 1 */}
      <div className="contador-container">
        <h2>Contador do Botão 1: {contador1}</h2>
        <button className="botao" onClick={incrementarBotao1}>
          Botão 1
        </button>
      </div>

      {/* Botão 2 */}
      <div className="contador-container">
        <h2>Contador do Botão 2: {contador2}</h2>
        <button className="botao" onClick={incrementarBotao2}>
          Botão 2
        </button>
      </div>
    </div>
  );
}

export default SectionA;
