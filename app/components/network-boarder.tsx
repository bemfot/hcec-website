"use client"

import { RefreshCw, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

interface NetworkErrorBoundaryProps {
  children: React.ReactNode;
  onRetry?: () => void;
}

export function NetworkErrorBoundary({ 
  children, 
  onRetry 
}: NetworkErrorBoundaryProps) {
  const [networkError, setNetworkError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleError = () => setNetworkError(true);
    const handleOnline = () => setNetworkError(false);
    
    window.addEventListener("network-error", handleError);
    window.addEventListener("offline", handleError);
    window.addEventListener("online", handleOnline);
    
    return () => {
      window.removeEventListener("network-error", handleError);
      window.removeEventListener("offline", handleError);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    try {
      await fetch('/api/health-check', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      
      if (onRetry) {
        await onRetry();
      }
      
      setNetworkError(false);
    } catch (error) {
      console.log('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  if (networkError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#9f0712_1px,_transparent_0)] bg-[length:20px_20px]"></div>
            </div>
            
            <div className="relative p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center shadow-inner border-2 border-red-100">
                <WifiOff className="w-10 h-10" style={{ color: '#9f0712' }} />
              </div>

              <h2 className="text-2xl font-bold text-black mb-3">
                Connection Lost
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                We&apos;re having trouble connecting to our servers. Please check your internet connection and try again.
              </p>

              <div className="flex items-center justify-center gap-2 mb-8 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  📡 Network connectivity required
                </span>
              </div>

              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="group relative w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                style={{ backgroundColor: '#9f0712' }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center justify-center gap-3">
                  <RefreshCw 
                    className={`w-5 h-5 ${isRetrying ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} 
                  />
                  <span>
                    {isRetrying ? 'Reconnecting...' : 'Try Again'}
                  </span>
                </div>
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  🙏 If the problem persists, please contact our support team
                </p>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-200"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-red-100"></div>
          </div>

          <div className="absolute inset-0 rounded-2xl blur-xl -z-10 opacity-30" style={{ backgroundColor: '#9f0712' }}></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
