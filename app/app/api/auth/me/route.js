import prisma from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET(){
  const token = cookies().get("token")?.value
  if(!token) return Response.json({detail:"missing token"}, {status:401})
  const payload = verifyToken(token)
  if(!payload) return Response.json({detail:"invalid token"}, {status:401})

  const user = await prisma.user.findUnique({ where:{ id: payload.uid }, select:{ id:true, username:true, nickname:true, balance:true } })
  if(!user) return Response.json({detail:"user not found"}, {status:404})
  return Response.json(user)
}
