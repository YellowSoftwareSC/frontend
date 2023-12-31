import { useRegister } from "context/register/RegisterContext";
import ListaItens from "./lista";
import AcoesItens from "./acoes";
import { Placeholder } from "phosphor-react";
import ReceberCaixaGeral from "./receber";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import Swal from "sweetalert2";
import ItensSelecionados from "./itensselecionados";
import { useState } from "react";
import ButtonReceber from "@components/base/ButtonReceber";

const ItensContainer = () => {
  const { caixaGeral, numeroComanda, setRefetchComandas, codigoComanda } =
    useRegister();
  const [isLoading, setIsLoading] = useState(false);

  const handlePagar = () => async () => {
    setIsLoading(true);
    mutationPagar.mutate(caixaGeral);
  };

  const mutationPagar = useMutation(
    (s: typeof caixaGeral) => {
      return api.post(`Caixa/Pagar`, s);
    },
    {
      onSuccess: async () => {
        Swal.fire({
          icon: "success",
          background: "#333",
          color: "#cccccc",
          iconColor: "#bef264",
          title: "Pedido pago com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });

        const $cardComanda = document.getElementById(
          `comanda-${codigoComanda}`
        );

        $cardComanda && $cardComanda.click();

        setRefetchComandas(true);
        setIsLoading(false);
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
        setIsLoading(false);
      },
    }
  );

  if (!numeroComanda)
    return (
      <div className="bg-zinc-800 w-[50%] h-[97.5vh] rounded-md p-5 mr-2 flex flex-col text-[#cccc] text-center justify-center text-3xl">
        <div className="flex flex-col gap-2 items-center">
          <div>Nenhuma comanda selecionada!</div>
          <Placeholder />
        </div>
      </div>
    );

  return (
    <div className="bg-zinc-800 w-[50%] h-[97.5vh] rounded-md p-5 mr-2 flex flex-col text-[#cccccc]">
      <div className="w-full bg-zinc-700 rounded-md mt-1 flex p-2 gap-2 justify-between items-center py-1 my-1">
        <h2 className="text-2xl font-bold mb-2 w-[50%] lg:text-lg">
          Comanda {numeroComanda}
        </h2>
        <h2 className="text-2xl font-bold mb-2 w-[50%] lg:text-lg">
          Mesa {caixaGeral?.numeroQuartoMesa}
        </h2>
      </div>
      <div className="text-[#cccccc] max-h-96 itens-caixa">
        <ListaItens />
        <div className="flex justify-between">
          <ReceberCaixaGeral />
          <ItensSelecionados />
        </div>
        <AcoesItens />
        <div className="w-[100%] h-20 content-end	">
          <ButtonReceber
            disabled={isLoading}
            isLoading={isLoading}
            onClick={handlePagar()}
            id="receber-e-finalizar"
          >
            Receber e finalizar
          </ButtonReceber>
        </div>
      </div>
    </div>
  );
};

export default ItensContainer;
