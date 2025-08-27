async function fetchMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/auth/me`, { cache:"no-store" })
  if(!res.ok) return null
  return res.json()
}

export default async function LobbyPage(){
  const me = await fetchMe()
  return (
    <div className="container">
      <div className="card">
        <h2>大廳</h2>
        {me ? (
          <>
            <p>歡迎，<b>{me.nickname || me.username}</b></p>
            <p>餘額：{me.balance}</p>
            <div className="row" style={{marginTop:10}}>
              {/* 之後這裡放「百家樂房間1/2/3」入口 */}
            </div>
          </>
        ) : (
          <p>尚未登入，請先至 / (auth) / login</p>
        )}
      </div>
    </div>
  )
}
