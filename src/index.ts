import { Hono } from "hono";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import { todosTable } from "./schema";
import { eq } from "drizzle-orm";

const app = new Hono();

/* app.get("/", async (c) => {
  const students = await db.select().from(table).all();

  return c.json(students);
}); */

/* app.post("/", async (c) =>{
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
}); */

app.post("/todos", async (c) => {
  try {
    const { title } = await c.req.json();
    if (!title) {
      throw new Error("Title required");
    }
    const newTodo = {
      id: uuidv4(),
      title,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const todos = await db
      .insert(todosTable)
      .values(newTodo)
      .returning();
    return c.json(todos);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.get("/", async (c) => {
  try {
    const todos = await db
      .select()
      .from(todosTable)
      .all();
    return c.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

app.put("/todos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { title, status } = await c.req.json();

    const existingTodo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id))
      .get();

    if (!existingTodo) {
      return c.json({ message: "Todo not found" }, 404);
    }
    const updateFields = {
      updateAt: new Date().toISOString(),
      ...(title && { title }),
      ...(status && { status }),
    };

    const updateTodo = await db
      .update(todosTable)
      .set(updateFields)
      .where(eq(todosTable.id, id))
      .returning();
    return c.json(updateTodo);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.delete("/todos/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const existingTodo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id))
      .get();

    if (!existingTodo) {
      return c.json({ message: "Todo not found" }, 404);
    }

    await db.delete(todosTable).where(eq(todosTable.id, id));

    return c.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error('Error fetching todo:', error);
    return c.json({ error: (error as Error).message }, 400);
  }
});



app.get("/todos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id))
      .get();
 
    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }
 
    return c.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return c.json({ error: (error as Error).message }, 400); 
  }
 });

export default app;
