import { z } from "zod";

// schemas
const marketSchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  price: z.number().optional(), // or .positive() if you want > 0
  volume: z.number().optional(),
});

const marketsSchema = z.array(marketSchema);

//types
export type Market = z.infer<typeof marketSchema>;
export type Markets = z.infer<typeof marketsSchema>;
