export function UsersHeader() {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#1e293b",
              letterSpacing: "-0.01em",
            }}
          >
            Users Management
          </h1>
          <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: 14 }}>
            Manage your team members and their access levels
          </p>
        </div>
        <div />
      </div>
    </div>
  );
}


