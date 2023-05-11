import * as path from "path";

import * as fs from "fs-extra";
import * as z from "zod";

const INPUT_DIR = path.join(__dirname, "../api-docs/models");
const OUTPUT_DIR = path.join(__dirname, "../app/schema");

const inputFiles = fs.readdirSync(INPUT_DIR);

const stringSchema = z
  .object({
    type: z.literal("string"),
    minLength: z.number().optional(),
    description: z.string().optional(),
    format: z.enum(["date-time"]).optional(),
    enum: z.array(z.string()).optional(),
    minimum: z.literal(0).optional(),
    default: z.string().optional(),
  })
  .strict();

const numberSchema = z
  .object({
    type: z.enum(["integer", "number"]),
    description: z.string().optional(),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
  })
  .strict();

const booleanSchema = z
  .object({
    type: z.literal("boolean"),
    default: z.boolean(),
    description: z.string().optional(),
  })
  .strict();

const refSchema = z
  .object({
    type: z.undefined(),
    $ref: z.string(),
  })
  .strict();

const baseObjectSchema = z
  .object({
    type: z.literal("object"),
    description: z.string().optional(),
    required: z.array(z.string()).optional(),
    "x-examples": z.any().optional(),
  })
  .strict();

const recursiveObjectSchema = baseObjectSchema
  .extend({
    properties: z.record(
      z.discriminatedUnion("type", [
        baseObjectSchema,
        stringSchema,
        numberSchema,
        booleanSchema,
        refSchema,
      ])
    ),
  })
  .strict();

const arraySchema = z
  .object({
    type: z.literal("array"),
    items: z.discriminatedUnion("type", [
      recursiveObjectSchema,
      stringSchema,
      numberSchema,
      refSchema,
    ]),
    description: z.string().optional(),
  })
  .strict();

const objectSchema = recursiveObjectSchema
  .extend({
    properties: z.record(
      z.string().min(1),
      z.discriminatedUnion("type", [
        stringSchema,
        numberSchema,
        booleanSchema,
        arraySchema,
        refSchema,
        recursiveObjectSchema,
      ])
    ),
  })
  .strict();

const modelSchema = z.discriminatedUnion("type", [
  objectSchema,
  stringSchema,
  numberSchema,
  arraySchema,
  booleanSchema,
]);
type Model = z.infer<typeof modelSchema>;

const toSchemaName = (className: string) =>
  `${className.slice(0, 1).toLowerCase()}${className.slice(1)}Schema`;

const createSchema = (
  model: Model,
  imports: Set<string>,
  indentation = 0
): string => {
  switch (model.type) {
    case "object":
      return `z.object({
${Object.entries(model.properties)
  .map(([key, value]) => {
    const isOptional = !model.required?.includes(key);
    const comment =
      "description" in value && value.description
        ? `// ${value.description}\n${" ".repeat(indentation + 2)}`
        : "";
    return `${comment}${key}: ${createSchema(
      value as Model,
      imports,
      indentation + 2
    )}${isOptional ? ".optional()" : ""},`;
  })
  .map((value) => ` `.repeat(indentation + 2) + value)
  .join("\n")}
${" ".repeat(indentation)}})`;
    case "string":
      const stringDecorators: string[] = [];
      if (model.minLength) {
        stringDecorators.push(`.min(${model.minLength})`);
      }
      if (model.format === "date-time") {
        stringDecorators.push(".datetime()");
      }
      if (model.enum) {
        return `z.enum([${model.enum
          .map((value) => `"${value}"`)
          .join(", ")}])`;
      }
      return `z.string()${stringDecorators.join("")}`;
    case "array":
      return `z.array(
${" ".repeat(indentation + 2)}${createSchema(
        model.items as Model,
        imports,
        indentation + 2
      )}
${" ".repeat(indentation)})`;
    case "number":
    case "integer":
      const numberDecorators: string[] = [];
      if (model.minimum !== undefined) {
        numberDecorators.push(`.min(${model.minimum})`);
      }
      if (model.maximum !== undefined) {
        numberDecorators.push(`.max(${model.maximum})`);
      }
      return `z.number()${numberDecorators.join("")}`;
    case "boolean":
      return `z.boolean()`;
    case undefined:
      const refValue = (model as any).$ref?.split("/").pop().split(".")[0];
      imports.add(toSchemaName(refValue));
      return `${toSchemaName(refValue)}`;
  }
};

inputFiles.forEach((inputFile) => {
  const className = inputFile.replace(".json", "");
  const schemaName = toSchemaName(className);
  const model = modelSchema.parse(
    JSON.parse(fs.readFileSync(path.join(INPUT_DIR, inputFile), "utf8"))
  );

  const imports = new Set<string>();
  const schemaOutput = createSchema(model, imports);
  const output = `import z from "zod";${Array.from(imports.values())
    .map((value) => `\nimport { ${value} } from "./${value}";`)
    .join("")}

export const ${schemaName} = ${schemaOutput};

export type ${className} = z.infer<typeof ${schemaName}>;
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, `${schemaName}.ts`), output, "utf8");
});
