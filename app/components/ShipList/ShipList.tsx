import { useContext } from "react";

import { ShipContext } from "~/contexts/ShipContext";
import type { Ship } from "~/schema/shipSchema";

import STYLES from "./ShipList.module.css";

type ShipRowProps = {
  ship: Ship;
};

const ShipRow = ({ ship }: ShipRowProps) => {
  const differentDestination =
    ship.nav.route.destination.symbol !== ship.nav.route.departure.symbol;
  return (
    <div className={STYLES.ShipRow}>
      <div>{ship.symbol}</div>
      <div>{ship.registration.role}</div>
      <div>{ship.nav.flightMode}</div>
      <div>{ship.nav.route.departure.symbol}</div>
      <div>{differentDestination ? ship.nav.route.destination.symbol : ""}</div>
    </div>
  );
};

export const ShipList = () => {
  const { data: ships } = useContext(ShipContext);

  return (
    <div className={STYLES.ShipList}>
      <div className={STYLES.ShipGrid}>
        <div className={STYLES.ShipRowHeader}>
          <div>Symbol</div>
          <div>Role</div>
          <div>Flight Mode</div>
          <div>Origin</div>
          <div>Destination</div>
        </div>
        {ships?.map((ship) => (
          <ShipRow key={ship.symbol} ship={ship} />
        ))}
      </div>
      <div>{ships?.length || 0} ships.</div>
    </div>
  );
};
