import DashboardHeader from './DashBaordHeader';
import CustomerDataPreview from './CustomerDataPreview';
import DataIngestion from './DataIngestion';
import OffreGenerator from './OffreGenerator';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-6 md:p-8 space-y-6">
      {/* 1. Top Section: Agent Network Status */}
      <DashboardHeader />

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Side: Data Preview */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <CustomerDataPreview />
        </div>

        {/* Right Side: Data Ingestion (Top) + Offer Generator (Bottom) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <DataIngestion />
          <OffreGenerator />
        </div>

      </div>
    </div>
  );
}
