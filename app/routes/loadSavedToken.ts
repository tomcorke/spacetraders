import fs from "fs-extra";
import z from "zod";
import path from "path";
import { tokenSchema } from "~/services/spacetraders-schema";

const storedTokenSchema = z.object({
  token: tokenSchema,
});

export async function loader() {
  const fileContents = fs.readFileSync(
    path.join(__dirname, "../data/savedToken.json"),
    "utf8"
  );

  const { token } = storedTokenSchema.parse(JSON.parse(fileContents));

  return { token };
}
