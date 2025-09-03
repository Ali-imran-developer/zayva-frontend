import ShoppingHeader from "@/components/shopping-view/header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function NotFound() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleClick() {
    navigate(`/`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ShoppingHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Illustration Section */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-2xl rotate-3 opacity-70"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 500 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="250" cy="200" r="150" fill="#f3f4f6" />
                  <circle cx="250" cy="200" r="130" fill="#e5e7eb" />
                  <circle
                    cx="250"
                    cy="200"
                    r="110"
                    fill="#f9fafb"
                    stroke="#d1d5db"
                    strokeWidth="2"
                  />

                  {/* 404 Text */}
                  <text
                    x="250"
                    y="180"
                    textAnchor="middle"
                    fontSize="64"
                    fontWeight="bold"
                    fill="#3b82f6"
                  >
                    404
                  </text>
                  <text
                    x="250"
                    y="230"
                    textAnchor="middle"
                    fontSize="24"
                    fill="#6b7280"
                  >
                    Page Not Found
                  </text>

                  {/* Magnifying Glass */}
                  <circle
                    cx="350"
                    cy="120"
                    r="40"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="8"
                  />
                  <line
                    x1="380"
                    y1="150"
                    x2="420"
                    y2="190"
                    stroke="#9ca3af"
                    strokeWidth="8"
                  />

                  {/* Confused Face */}
                  <circle cx="250" cy="280" r="10" fill="#4b5563" />
                  <circle cx="220" cy="280" r="10" fill="#4b5563" />
                  <path
                    d="M200 320 Q250 350 300 320"
                    stroke="#4b5563"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              Oops! Page not found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>

            <div className="relative flex items-center mb-8">
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg"
              />
              <button
                type="submit"
                className="absolute right-2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <Button
                onClick={handleClick}
                className="flex-1 py-5 bg-black rounded-none transition-colors"
              >
                Go Back to Home
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 py-5 rounded-none border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;