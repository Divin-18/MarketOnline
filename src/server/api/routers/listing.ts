import { z } from "zod";

import { createTRPCRouter, publicProcedure,protectedProcedure } from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  list:publicProcedure.query(({ctx})=>{
   return ctx.db.listing.findMany();
  }),

  get: publicProcedure
  .input(z.object({
    listingId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.listing.findUnique({
      where: {
        id:input.listingId,
      },
    });
  }),

  orderitem:protectedProcedure
  .input(z.object({name:z.string()}))
  .query(({ctx,input})=>{
    return ctx.db.listing.findFirst({
      where:{
        name:input.name,
      }
    });
  }),

  
  create: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string(), price: z.number() }))
    .mutation(async ({input,ctx}) => {
       const listing =await ctx.db.listing.create({
        data:{
          ...input,
          userId: ctx.auth.userId,
        },
       })
       return listing;
    }),
});