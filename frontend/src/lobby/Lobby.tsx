import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Define a player type
interface Player {
  id: string;
  name: string;
}

const socket = io("http://localhost:4000"); // Connect to the backend

const Lobby = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]); // Set the state type to Player[]

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
    <div className="flex flex-col">
      <h1>Spyfall Game Lobby</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button onClick={joinLobby}>Join Lobby</Button>

      <h2>Players in Lobby: {players.length}</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
