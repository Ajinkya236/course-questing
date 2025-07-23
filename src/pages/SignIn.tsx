
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { AuthContext } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignInHeader from '@/components/auth/SignInHeader';
import SignInForm from '@/components/auth/SignInForm';
import SignInFooter from '@/components/auth/SignInFooter';

const SignIn = () => {
  const navigate = useNavigate();
  const { user, login, isAuthenticating } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Form submission handler
  const handleSubmit = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setError(null);
    try {
      await login(data.email, data.password, data.rememberMe);
      
      toast({
        title: "Welcome to the Learning Portal!",
        description: "You have successfully signed in.",
      });
      
      navigate('/');
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials.");
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Learning Management System</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-md">
          <SignInHeader />
          
          <Card>
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm 
                onSubmit={handleSubmit}
                isAuthenticating={isAuthenticating}
                error={error}
                onForgotPassword={handleForgotPassword}
              />
            </CardContent>
            <CardFooter>
              <SignInFooter onSignUp={handleSignUp} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignIn;
