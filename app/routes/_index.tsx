import { Agent } from "~/components/Agent";
import { ContractList } from "~/components/ContractList";
import { Header } from "~/components/Header";
import { ShipList } from "~/components/ShipList";
import { Wrapper } from "~/components/Wrapper";
import { UniverseContainer } from "~/components/UniverseContainer";

import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Shot's SpaceTraders" }];
};

export default function Index() {
  return (
    <Wrapper>
      <Header />
      <Agent />
      <UniverseContainer />
    </Wrapper>
  );
}
