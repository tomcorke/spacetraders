import z from "zod";

export const shipRoleSchema = z.enum(["FABRICATOR", "HARVESTER", "HAULER", "INTERCEPTOR", "EXCAVATOR", "TRANSPORT", "REPAIR", "SURVEYOR", "COMMAND", "CARRIER", "PATROL", "SATELLITE", "EXPLORER", "REFINERY"]);

export type ShipRole = z.infer<typeof shipRoleSchema>;
