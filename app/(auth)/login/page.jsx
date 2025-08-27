"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage(){
  const [u,setU] = useState("")
  const [p,setP] = useState("")
  const [err,setErr] = useState("")
  const router = useRouter()

  async function onSubmit(e){
    e.preventDefault()
    setErr("")
    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ username:u, password:p })
    })
    if(res.ok){ router.push("/lobby"); return }
    const j = await res.json().catch(()=>({}))
    setErr(j?.detail || "登入失敗")
  }

  return (
    <div className="center">
      <form className="card" style={{width:360}} onSubmit={onSubmit}>
        <h2>登入</h2>
        <label>帳號</label>
        <input className="input" value={u} onChange={e=>setU(e.target.value)} />
        <label style={{marginTop:8}}>密碼</label>
        <input type="password" className="input" value={p} onChange={e=>setP(e.target.value)} />
        {err && <div style={{color:"#ff9191",marginTop:8}}>{err}</div>}
        <button className="btn primary" style={{marginTop:12}}>登入</button>
      </form>
    </div>
  )
}
