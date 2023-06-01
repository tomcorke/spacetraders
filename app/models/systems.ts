import type { System } from "~/schema/systemSchema";
import { listAllSystems } from "~/services/spacetraders";

import { Subscribable } from "./subscribable";

export class SystemModel {
  system: System;

  constructor(system: System) {
    this.system = system;
  }
}

export class SystemsManager extends Subscribable<void> {
  private systems: Map<string, SystemModel> = new Map();

  private geoBuckets: Map<number, Map<number, SystemModel[]>> = new Map();

  constructor() {
    super();
    this.getAllSystems = this.getAllSystems.bind(this);
  }

  private geoHash(coord: number): number {
    return Math.round(coord / 10);
  }

  async *fetchAndAddSystems(token: string) {
    for await (const systems of listAllSystems(token)) {
      for (const system of systems) {
        this.addSystem(system);
      }
      yield this.systems;
    }
  }

  addSystem(system: System) {
    if (!this.systems.has(system.symbol)) {
      this.systems.set(system.symbol, new SystemModel(system));
    }
    this.notify();
  }

  getAllSystems(): SystemModel[] {
    return Array.from(this.systems.values());
  }

  getEmptySystemList(): SystemModel[] {
    return [];
  }
}
