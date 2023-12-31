import { useRegister } from "context/register/RegisterContext";
import { Divide, Plus } from "phosphor-react";
import { useState } from "react";
import Swal from "sweetalert2";
import LancarPedidoWindow from "../lancarpedido";

const AcoesItens = () => {
  const { caixaGeral, calcular, codigoTag } = useRegister();
  const [isLancarPedidoOpen, setIsLancarPedidoOpen] = useState<boolean>(false);

  const handleDivide = () => async () => {
    Swal.fire({
      title: "Dividir para quantas pessoas?",
      input: "number",
      background: "#333",
      color: "#cccccc",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Dividir",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ef4444",
      confirmButtonColor: "#84cc16",
      showLoaderOnConfirm: true,
      preConfirm: (pessoas) => {
        return calcular({
          ...caixaGeral,
          dividirEmQuantasPessoas: Number(pessoas),
        })
          .then((response: any) => {
            if (!response.success) {
              throw new Error(response.reasonPhrase);
            }
            return response;
          })
          .catch((error: any) => {
            Swal.showValidationMessage(`Algo deu errado: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.body.valorTotalReceberPorPessoa.toLocaleString(
            "pt-br",
            {
              style: "currency",
              currency: "BRL",
            }
          )}`,
          text: "Valor por pessoa",
          showCancelButton: true,
          color: "#cccccc",
          background: "#333",
          cancelButtonColor: "#ef4444",
          confirmButtonColor: "#84cc16",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Receber e finalizar",
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById("receber-e-finalizar")?.click();
          }
        });
      }
    });
  };

  const handleAddItem = () => async () => {
    setIsLancarPedidoOpen(true);
    /*   Swal.fire({
      title: 'Lançar item não cadastrado',
      html:
        `<form>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
            <input type="text" id="company" class="input input-bordered w-full" required>
        </div> 
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
              <input type="umber" id="first_name" class="input input-bordered w-full" required>
          </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor unitário</label>
            <input type="number" id="last_name" class="input input-bordered w-full" required>
        </div>
        </div>
        </form>`,
      confirmButtonText: "Lançar item",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ef4444",
      confirmButtonColor: "#84cc16",
      background: "#333",
      color: "#cccccc",
    }) */
  };

  return (
    <>
      <div className="flex gap-2 my-3">
        <button
          onClick={handleDivide()}
          className="btn btn-info font-semibold text-zinc-900 text-base 
          xl:h-1 xl:px-2 xl:p-1 xl:text-xs xl:font-bold
          "
        >
          Dividir
          <Divide size={24} />
        </button>
        <button
          onClick={handleAddItem()}
          className="btn btn-primary text-base
        xl:h-1 xl:px-2 xl:p-1 xl:text-xs xl:font-bold
        "
        >
          Lançar itens <Plus size={24} />
        </button>
      </div>
      <a>Valor a receber</a>
      <div className="w-full bg-zinc-700 rounded-md mt-2 flex p-3 gap-2 justify-right items-right py-5	xl:h-10 xl:mt-0 xl:p-1 xl:gap-1 text-right">
        <span className="w-full text-4xl mx-10 font-semibold xl:text-2xl xl:mx-2 text-right">
          R${caixaGeral?.valorTotalReceber}
        </span>
      </div>
      <LancarPedidoWindow
        isOpen={isLancarPedidoOpen}
        setIsOpen={setIsLancarPedidoOpen}
        codigoTag={codigoTag}
      />
    </>
  );
};

export default AcoesItens;
