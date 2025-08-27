import prisma from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function POST(req){
  const { username, password } = await req.json()
  if(!username || !password) return Response.json({detail:"缺少欄位"}, {status:422})

  const exists = await prisma.user.findUnique({ where:{ username } })
  if(exists) return Response.json({detail:"帳號已存在"}, {status:409})

  const passwordHash = await hashPassword(password)
  const user = await prisma.user.create({
    data:{ username, passwordHash, nickname: username }
  })
  return Response.json({ ok:true, id:user.id })
}
