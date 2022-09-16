import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdd() {
  return (
    <div className="pt-1 bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] self-stretch rounded-lg mt-8">
      <div className=" bg-[#262634] px-8 py-6 self-stretch rounded-md flex justify-between">
        <div>
          <strong className="font-black text-white text-2xl block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 text-small block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="rounded-md bg-violet-500 hover:bg-violet-600 text-white py-4 px-4 flex">
          <MagnifyingGlassPlus className="mr-3 w-6 h-6 self-center" />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
