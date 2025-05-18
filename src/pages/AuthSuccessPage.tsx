import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4" data-id="d1qh0cxde" data-path="src/pages/AuthSuccessPage.tsx">
      <Card className="w-full max-w-md border border-purple-700 bg-gray-900 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Registration Complete!
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your account has been successfully verified
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center" data-id="n38shmto5" data-path="src/pages/AuthSuccessPage.tsx">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" data-id="avlt5vlf4" data-path="src/pages/AuthSuccessPage.tsx">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7" data-id="nsni8sk2z" data-path="src/pages/AuthSuccessPage.tsx" />

            </svg>
          </div>
          <p className="text-center text-gray-300" data-id="f5vpfwef8" data-path="src/pages/AuthSuccessPage.tsx">
            Thank you for verifying your email. You can now log in to your account and start building your resume!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-gray-400" data-id="edjb0y1v1" data-path="src/pages/AuthSuccessPage.tsx">
            Redirecting to home page in {countdown} seconds...
          </p>
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">

            Go to Home Page
          </Button>
        </CardFooter>
      </Card>
    </div>);

};

export default AuthSuccessPage;