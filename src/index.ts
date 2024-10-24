import { Hono } from "hono";
import { db } from "./db";
import { table } from "./schema";


const app = new Hono();

app.get("/", async (c) => {
  const students = await db.select().from(table).all();

  return c.json(students);
});

app.post("/", async (c) =>{
try{
  const body = await c.req.json();

  if(!body.name){
    throw new Error("Name required");
    }

    const students = await db 
    .insert(table)
    .values({
      name: body.name,
    })
    .returning();
    return c.json(students);

}catch (error) {
return c.json({error: (error as Error).message}, 400);
}
});

export default app;
