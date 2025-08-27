import prisma from "@/lib/db"
import { verifyPassword, signToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(req){
  const { username, password } = await req.json()
  if(!username || !password) return Response.json({detail:"缺少欄位"}, {status:422})

  const user = await prisma.user.findUnique({ where:{ username } })
  if(!user) return Response.json({detail:"帳密錯誤"}, {status:401})

  const ok = await verifyPassword(password, user.passwordHash)
  if(!ok) return Response.json({detail:"帳密錯誤"}, {status:401})

  const token = signToken({ uid:user.id, username:user.username })
  cookies().set("token", token, { httpOnly:true, sameSite:"lax", secure:true, path:"/", maxAge:60*60*24*7 })
  return Response.json({ ok:true })
}
