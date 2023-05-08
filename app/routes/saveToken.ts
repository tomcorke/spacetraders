import type { ActionArgs } from "@remix-run/node";
import fs from "fs-extra";
import z from "zod";
import path from "path";

const saveTokenSchema = z.object({
  token: z.string(),
});

export const action = async ({ request }: ActionArgs) => {
  const { token } = saveTokenSchema.parse(await request.json());
  fs.writeFileSync(
    path.join(__dirname, "../data/savedToken.json"),
    JSON.stringify({ token }),
    "utf8"
  );
  return { success: true, token };
};
