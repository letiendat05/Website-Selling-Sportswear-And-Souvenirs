export default function Banner() {
  return (
    <div
      className="h-80 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606813902546-094d1efb5cda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
      }}
    >
      Ưu đãi đặc biệt hôm nay!
    </div>
  )
}
