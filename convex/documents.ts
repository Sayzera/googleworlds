import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unathorized");
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untited coument",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user) {
     throw new ConvexError("Unauthorized");
    }

    
    const foo = await ctx.db.query("documents").paginate(args.paginationOpts);
    return foo;
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    /**
     * Kaydın varliğini sorgular id vermemiz yeterli tabloyu belirtmeye gerek yok
     */
    const documents = await ctx.db.get(args.id);

    if (!documents) {
      throw new ConvexError("Document not found");
    }

    const isOwner = documents.ownerId === user.subject;

    /**
     * Kaydı silen kişinin kaydın sahibi olup olmadığını kontrol eder
     */
    if (!isOwner) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    /**
     * Kaydın varliğini sorgular id vermemiz yeterli tabloyu belirtmeye gerek yok
     */
    const documents = await ctx.db.get(args.id);

    if (!documents) {
      throw new ConvexError("Document not found");
    }

    const isOwner = documents.ownerId === user.subject;

    /**
     * Kaydı silen kişinin kaydın sahibi olup olmadığını kontrol eder
     */
    if (!isOwner) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});
