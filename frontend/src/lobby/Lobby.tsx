import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';


// Define a player type
interface Player {
  id: string;
  name: string;
}

const socket = io("http://localhost:4000"); // Connect to the backend

const Lobby = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]); // Set the state type to Player[]

  const startGame = () => {
    navigate('/game'); // navigates to the game page
  };
  useEffect(() => {
    socket.on("updateLobby", (playerList: Player[]) => {
      setPlayers(playerList);
    });

    return () => {
      socket.off("updateLobby");
    };
  }, []);

  const joinLobby = () => {
    if (playerName.trim() !== "") {
      socket.emit("joinLobby", playerName);
    }
  };


  return (
    <div className="flex flex-col items-center p-10 space-y-6 bg-black rounded-lg shadow-lg min-h-screen w-full">
      <h1 className="text-3xl text-white font-serif text-center">Spyfall Game Lobby</h1>
      {/* Name Info */}
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="border-2 border-gray-300 font-thin p-2 rounded-lg w-3/4 text-lg text-center"
      />
      {/* Join Lobby Button */}
      <Button onClick={joinLobby} className="w-1/2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Join Lobby
      </Button>

      {/* Player List Box */}
      <div className="w-full flex justify-center">
        <div className="w-3/4 h-96 overflow-y-auto border-2 border-gray-300 rounded-lg mt-2 p-2 bg-white">
          <h2 className="text-xl text-black font-bold border-b-2 text-center mb-4">Players in Lobby: {players.length}</h2>
          <ul className="space-y-2">
            {players.map((player) => (
              <li key={player.id} className="text-lg">{player.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Start Game Button */}
      <Button onClick={startGame} className="w-1/2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Start Game
      </Button>
    </div>
  );


};

export default Lobby;
