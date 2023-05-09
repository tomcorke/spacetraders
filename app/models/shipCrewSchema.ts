import z from "zod";

export const shipCrewSchema = z.object({
  // The current number of crew members on the ship.
  current: z.number(),
  // The minimum number of crew members required to maintain the ship.
  required: z.number(),
  // The maximum number of crew members the ship can support.
  capacity: z.number(),
  // The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale.
  rotation: z.enum(["STRICT", "RELAXED"]),
  // A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents.
  morale: z.number().min(0).max(100),
  // The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint.
  wages: z.number().min(0),
});

export type ShipCrew = z.infer<typeof shipCrewSchema>;
