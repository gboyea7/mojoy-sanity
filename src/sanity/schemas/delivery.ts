// delivery.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "delivery",
  title: "Delivery",
  type: "document",
  fields: [
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
    }),
  ],
});
