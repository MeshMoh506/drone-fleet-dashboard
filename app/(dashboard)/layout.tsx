// import Header from '@/components/Header';

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header />
//       <main className="container mx-auto">{children}</main>
//     </div>
//   );
// }
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
