import { Etapa } from "./Etapa";

export type ProdutoType = {
  id?: number;
  tipo: TipoProduto;
  tempoPreparo: number;
  medidaTempoPreparo: MedidaTempoPreparo;
  serveQuantasPessoas: number;
  nome: string;
  valor: number;
  descricao?: string;
  base64Image?: string;
  codigoImpressora: number;
  etapas: ProdutoEtapaType[];
};

export type ProdutoSearchType = {
  id: number;
  nome: string;
};

export type ProdutoEtapaType = {
  id?: number;
  codigoEtapa: number;
};

export type ProdutoEtapaSearchType = {
  id?: number;
  codigoEtapa: number;
  nome: string;
};

export type EtapaProdutoType = {
  id: number;
  codigoEtapa: number;
  codigoProdutoServico: number;
  etapa: Etapa;
};

export enum TipoProduto {
  Produto = 0,
  // Servico = 1,  Descomentar posteriormente
  ItemEtapa = 2,
}

export enum MedidaTempoPreparo {
  Minuto = 0,
  Hora = 1,
}

export const EnumTipoProdutoServico = new Map<number, string>([
  [TipoProduto.Produto, "Produto"],
  // [TipoProduto.Servico, "Serviço"],  Descomentar posteriormente
  [TipoProduto.ItemEtapa, "Item de Etapa"],
]);

export const EnumMedidaTempoPreparo = new Map<number, string>([
  [MedidaTempoPreparo.Hora, "Hora(s)"],
  [MedidaTempoPreparo.Minuto, "Minuto(s)"],
]);
