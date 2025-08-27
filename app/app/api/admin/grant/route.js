import prisma from "@/lib/db"

export async function POST(req){
  const adminToken = process.env.ADMIN_TOKEN || ""
  const got = req.headers.get("x-admin-token") || ""
  if(!adminToken || got !== adminToken){
    return Response.json({ detail:"admin token invalid" }, { status:401 })
  }

  const { username, amount } = await req.json()
  if(!username || !amount || amount <= 0){
    return Response.json({ detail:"bad request" }, { status:422 })
  }

  const u = await prisma.user.findUnique({ where:{ username } })
  if(!u) return Response.json({ detail:"user not found" }, { status:404 })

  const updated = await prisma.user.update({
    where:{ id: u.id },
    data:{ balance: (u.balance ?? 0) + parseInt(amount,10) }
  })
  return Response.json({ ok:true, username, balance: updated.balance })
}
