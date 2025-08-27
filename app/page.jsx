import Link from "next/link"

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>TOPZ Casino</h1>
        <p>全端 1.0（Next.js + Prisma + Postgres）</p>
        <div className="row">
          <Link className="btn primary" href="/(auth)/login">登入</Link>
          <Link className="btn" href="/(auth)/register">註冊</Link>
          <Link className="btn" href="/lobby">進入大廳</Link>
        </div>
      </div>
    </div>
  )
}
