import Button from '@/components/ui/button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const BreadCrumbs = () => {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="flex items-center space-x-1 py-2 text-gray-700">
      <Button
        id="back-to-exec-btn"
        variant="ghost"
        onClick={goBack}
        className="flex items-center gap-2 text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={16}
          viewBox="0 0 20 16"
          fill="none"
        >
          <path
            d="M19.2125 7.9993L1.71252 7.9993"
            stroke="#0A3690"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.71332 15L1.71332 8L8.71332 1"
            stroke="#0A3690"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-lg text-[#0A3690]">History</span>
      </Button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>

      <span className="text-gray-600 font-medium">Batch View</span>
    </div>
  );
};

export default BreadCrumbs;
