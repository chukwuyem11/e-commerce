import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";


export default async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const session = await getSession({ req });
        // session.token.id,
        if (session) {
          if (req.method === "POST") {
            
    
            if (session) {
              const { title, body } = req.body;
            
              const Expo = await prisma.todo.create({
                data: {
                  user: {
                    connect: {
                      id: session.token.id,
                    }
                  },
    
                  title: title,
                  body: body,
                  
                },
              });
              

              

              res.json({ names: Expo });
            } else {
              console.log(nope);
            }
          } else if (req.method === "GET") {
            
            const Expo = await prisma.todo.findMany()
            res.json({ names: Expo });
           
          } else {
            console.log("e no work");
          }
        } else {
          console.log("Failed");
          // res.status(401);
        }
        // res.end;
      } catch (err) {
        console.log("Real stuff");
        console.log(err);
      }
      prisma.$disconnect();

}