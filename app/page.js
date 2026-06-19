export default function Home() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Poppins',system-ui,sans-serif", background:"#F0EBE5" }}>
      <img src="/assets/logo_steelBlue_transparents.png" alt="RekaLogik Studio" style={{ height:80, marginBottom:24 }} />
      <h1 style={{ fontSize:20, fontWeight:700, color:"#4A6F8A", marginBottom:8 }}>RekaLogik Studio</h1>
      <p style={{ color:"#7A8E9A", marginBottom:32 }}>Home page coming soon.</p>
      <a href="/register" style={{ padding:"12px 32px", background:"#4A6F8A", color:"white", borderRadius:999, fontSize:15, fontWeight:600, textDecoration:"none" }}>
        Go to Registration →
      </a>
    </div>
  );
}
