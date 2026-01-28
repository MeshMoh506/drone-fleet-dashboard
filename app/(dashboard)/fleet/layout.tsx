export default function FleetLayout({
  children,
  modal,
  list,
  stats,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  list: React.ReactNode;
  stats: React.ReactNode;
}) {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Section - Loads in parallel */}
      {stats}

      {/* Search/Filter Section - Static content */}
      {children}

      {/* Drones List - Loads in parallel */}
      {list}

      {/* Modal - For intercepting routes */}
      {modal}
    </div>
  );
}
