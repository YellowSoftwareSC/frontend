import * as React from "react";
import TabRoot from "@components/base/TabRoot";

type TabsType = {
  id: number;
  title: string;
};

const ProductsTabRoot = ({ children }: React.PropsWithChildren) => {
  const tabs: TabsType[] = [
    {
      id: 1,
      title: "Dados gerais",
    },
    {
      id: 2,
      title: "Etapas",
    },
    {
      id: 3,
      title: "Imagem",
    },
  ];

  return <TabRoot tabs={tabs}>{children}</TabRoot>;
};

export default ProductsTabRoot;
