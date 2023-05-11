import { useContext } from "react";

import type { Contract } from "~/schema/contractSchema";
import { ContractContext } from "~/contexts/ContractContext";
import type { ContractDeliverGood } from "~/schema/contractDeliverGoodSchema";

import STYLES from "./ContractList.module.css";

type ContractRowProps = {
  contract: Contract;
};

const ContractManifest = ({ goods }: { goods?: ContractDeliverGood[] }) => {
  return (
    <div className={STYLES.ContractManifest}>
      {goods?.map((good) => (
        <div
          key={`${good.destinationSymbol}-${good.tradeSymbol}`}
          className={STYLES.ContractManifestRow}
        >
          <div>{good.tradeSymbol}</div>
          <div>{good.destinationSymbol}</div>
          <div>
            {good.unitsFulfilled}/{good.unitsRequired}
          </div>
        </div>
      ))}
    </div>
  );
};

const ContractRow = ({ contract }: ContractRowProps) => {
  return (
    <div className={STYLES.ContractRow}>
      <div>{contract.id}</div>
      <div>{contract.type}</div>
      <div>
        <ContractManifest goods={contract.terms.deliver} />
      </div>
    </div>
  );
};

export const ContractList = () => {
  const { data: contracts } = useContext(ContractContext);

  return (
    <div className={STYLES.ContractList}>
      <div className={STYLES.ContractGrid}>
        <div className={STYLES.ContractRowHeader}>
          <div>ID</div>
          <div>Type</div>
          <div>Terms</div>
        </div>
        {contracts?.map((contract) => (
          <ContractRow key={contract.id} contract={contract} />
        ))}
      </div>
      <div>{contracts?.length || 0} contracts.</div>
    </div>
  );
};
