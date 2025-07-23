
import React from 'react';
import { Button } from '@/components/ui/button';

interface SignInFooterProps {
  onSignUp: () => void;
}

const SignInFooter: React.FC<SignInFooterProps> = ({ onSignUp }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Button variant="link" className="p-0" onClick={onSignUp}>
            Sign up
          </Button>
        </p>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        <p>
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default SignInFooter;
