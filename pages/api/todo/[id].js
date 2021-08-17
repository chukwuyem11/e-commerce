import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const postId = req.query.id;

  // GET /api/post/:id
  if (req.method === "GET") {
    const post = await prisma.product.findUnique({
      where: { id: Number(postId) },
      include:{
        category: true,
        subcategories: true,
        reviews: true
      }
    });
    res.json(post);
    prisma.$disconnect();
  }

  // DELETE /api/post/:id
  if (req.method === "DELETE") {
    const post = await prisma.todo.delete({
      where: { id: Number(postId) },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "PUT") {
    const { title, body } = req.body;
    const post = await prisma.todo.update({
      where: { id: Number(postId) },
      data: {
        title: title,
        body: body,
       
      },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "POST") {
    const post = await prisma.product.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }
};
