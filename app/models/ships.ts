import type { Ship } from "~/schema/shipSchema";

class ShipModel {
  private ship: Ship;

  constructor(ship: Ship) {
    this.ship = ship;
  }
}

export class ShipsManager {
  private ships: Map<string, ShipModel> = new Map();

  addShip(ship: Ship) {
    if (!this.ships.has(ship.symbol)) {
      this.ships.set(ship.symbol, new ShipModel(ship));
    }
  }

  getAllShips(): ShipModel[] {
    return Array.from(this.ships.values());
  }
}
