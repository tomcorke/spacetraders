import type { V2_MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header";
import { Wrapper } from "~/components/Wrapper";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Shot's SpaceTraders" }];
};

export default function Index() {
  return (
    <Wrapper>
    <Header />
    </Wrapper>
  );
}
