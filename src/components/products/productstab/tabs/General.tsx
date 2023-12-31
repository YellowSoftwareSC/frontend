import SearchField from "@components/base/SearchField";
import { ProductFormType } from "@components/products/ProductsWindow";
import { EnumType, getArray } from "@utils/enums";
import * as React from "react";
import { ImpressoraType } from "types/Impressora";
import { EnumMedidaTempoPreparo, EnumTipoProdutoServico } from "types/Produto";

export type GeneralProductPanelType = {
  tipoProduto: EnumType;
  setTipoProduto: React.Dispatch<EnumType>;
  medidaTempoPreparo: EnumType;
  setMedidaTempoPreparo: React.Dispatch<EnumType>;
  isTipoProdutoProduto: boolean;
  produto: ProductFormType;
  handleChangeProduto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDescricao: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  impressora: ImpressoraType;
  setImpressora: React.Dispatch<ImpressoraType>;
  impressoras: ImpressoraType[];
};

const General = ({
  tipoProduto,
  setTipoProduto,
  medidaTempoPreparo,
  setMedidaTempoPreparo,
  isTipoProdutoProduto,
  handleChangeProduto,
  handleChangeDescricao,
  produto: produto,
  impressora,
  setImpressora,
  impressoras,
}: GeneralProductPanelType) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Nome</span>
          <input
            type="text"
            placeholder="Nome do item"
            className="input input-bordered w-full mb-4"
            name="nome"
            value={produto.nome}
            onChange={handleChangeProduto}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Tipo</span>
          <SearchField
            value={tipoProduto}
            setValue={setTipoProduto}
            data={getArray(EnumTipoProdutoServico)}
            valueField="identificador"
            displayValue="value"
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Valor</span>
          <input
            type="number"
            placeholder="Valor do item"
            name="valor"
            step={.01}
            className="input input-bordered w-full mb-4"
            min={0}
            value={produto.valor}
            onChange={handleChangeProduto}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Serve quantas pessoas?</span>
          <input
            type="number"
            placeholder="Quantidade de pessoas"
            className="input input-bordered w-full mb-4"
            min={0}
            disabled={!isTipoProdutoProduto}
            name="serveQuantasPessoas"
            value={produto.serveQuantasPessoas}
            onChange={handleChangeProduto}
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Tempo de preparo</span>
          <input
            type="number"
            placeholder="Tempo de preparo"
            className="input input-bordered w-full mb-4"
            min={0}
            disabled={!isTipoProdutoProduto}
            name="tempoPreparo"
            value={produto.tempoPreparo}
            onChange={handleChangeProduto}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Medida do tempo</span>
          <SearchField
            value={medidaTempoPreparo}
            setValue={setMedidaTempoPreparo}
            data={getArray(EnumMedidaTempoPreparo)}
            valueField="identificador"
            displayValue="value"
            disabled={!isTipoProdutoProduto}
          />
        </div>
      </div>
      <span className="label-text">Impressora</span>
      {<SearchField
        value={impressora}
        setValue={setImpressora}
        data={impressoras}
        valueField="id"
        displayValue="descricao"
      />}
      <div className="w-full flex flex-col">
        <span className="label-text">Descrição</span>
        <textarea
          disabled={!isTipoProdutoProduto}
          className="input h-24"
          name="descricao"
          value={produto.descricao}
          onChange={handleChangeDescricao}
        ></textarea>
      </div>
    </div>
  );
};

export default General;
