import * as React from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

type TabsType = {
  id: number;
  title: string;
};

interface IProps extends React.PropsWithChildren {
  tabs: TabsType[];
}

const TabRoot = ({ tabs, children }: IProps) => {
  return (
    <div className="w-full max-w-3xl px-2 mt-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-[color:var(--w-base-100)] p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-[#292929]  focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-[#292929]  shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabRoot;
