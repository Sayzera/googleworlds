import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";

export const getByIds = query({
  args: {
    ids: v.array(v.id("documents")),
  },
  handler: async (ctx, { ids }) => {
    const documents = []

    for (const id of ids) {
      const document = await ctx.db.get(id);

      if(document) {
        documents.push({
          id: document._id, name: document.title
        })
      } else {
        documents.push({
          id, name: '[Removed]'
        })
      }
    }

    return documents
    
  },
});

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

    const organizationId = (user?.org_id ?? undefined) as string | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untited coument",
      ownerId: user.subject,
      initialContent: args.initialContent,
      organizationId,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    const organizationId = (user?.org_id ?? undefined) as string | undefined;

    // sadece search ve organizationId varsa
    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    // sadece search yapıyorsa
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user?.subject)
        )
        .paginate(paginationOpts);
    }

    // sadece organizationId varsa
    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    // bir kullanıcı kendi dokümanlarını görüntülüyorsa
    const foo = await ctx.db
      .query("documents")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user?.subject))
      .paginate(paginationOpts);
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
    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = (user?.org_id ?? undefined) as string | undefined;
    const isOrganizationMember = document?.organizationId === organizationId;

    const isOwner = document.ownerId === user.subject;

    /**
     * Kaydı silen kişinin kaydın sahibi olup olmadığını kontrol eder
     */
    if (!isOwner && !isOrganizationMember) {
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
    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = (user?.org_id ?? undefined) as string | undefined;

    const isOrganizationMember = document?.organizationId === organizationId;
    const isOwner = document.ownerId === user.subject;

    /**
     * Kaydı silen kişinin kaydın sahibi olup olmadığını kontrol eder
     */
    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const getById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
