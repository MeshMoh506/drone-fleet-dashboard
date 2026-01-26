import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function DroneNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Drone Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          The drone youre looking for doesnt exist or has been removed.
        </p>

        <Link
          href="/fleet"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Fleet
        </Link>
      </div>
    </div>
  );
}
