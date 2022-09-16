import "./styles/main.css";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/Logo.svg";
import { GameCard } from "./components/GameCard";
import { CreateAdd } from "./components/createAdd";
import { useEffect, useState } from "react";
import { GameController } from "phosphor-react";

interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: string };
}

function App() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    fetch("http://localhost:1212/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className={"max-w-[1344px] mx-auto flex flex-col items-center m-20"}>
      <img src={logoImg} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              name={game.title}
              ads={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdd />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2a2334] py-8 px-10 w-[480px] shadow-lg shadow-black/25 text-white rounded-lg -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
            <Dialog.Title className="text-3xl text-white font-black">
              Publique um anuncio
            </Dialog.Title>
            <form action="">
              <div>
                <label htmlFor="game">Qual o game?</label>
                <input
                  id="game"
                  type="text"
                  placeholder="Selecione o game que deseja jogar"
                />
              </div>
              <div>
                <label htmlFor="name">Seu nome ou nickname</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>
              <div>
                <div>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <input
                    id="yearsPlaying"
                    type="text"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>
                <div>
                  <label htmlFor="discord">Qual seu discord?</label>
                  <input id="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                </div>
                <div>
                  <label htmlFor="hourStart">Qual horario do dia?</label>
                  <div>
                    <input id="hourStart" type="time" placeholder="De" />
                    <input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>
              <div>
                <input type="checkbox" />
                Costumo me conectar no chat de voz
              </div>
              <footer>
                <button>Cancelar</button>
                <button type="submit">
                  <GameController />
                  Encontre seu duo
                </button>{" "}
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
