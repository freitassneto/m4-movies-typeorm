import { z } from "zod";

const createMovieSchema = z.object({
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number().positive().int(),
  price: z.number().positive().int(),
});

const movieUpdateSchema = createMovieSchema.partial();

const returnMovieSchema = createMovieSchema.extend({
  id: z.number().positive().int(),
});

const allMoviesSchema = z.array(returnMovieSchema);


export { createMovieSchema, returnMovieSchema, allMoviesSchema, movieUpdateSchema };
