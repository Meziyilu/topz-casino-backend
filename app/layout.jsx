import "./../styles/globals.css"

export const metadata = { title: "TOPZ Casino", description: "Fullstack 1.0" }

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
