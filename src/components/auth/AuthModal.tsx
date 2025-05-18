import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register' | 'reset';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await window.ezsite.apis.login({ email, password });
      if (error) throw error;
      toast({
        title: 'Success!',
        description: 'You have been logged in.',
        variant: 'default'
      });
      onClose();
      // Reload the page to update auth state
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Login failed',
        description: String(error),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure your passwords match.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await window.ezsite.apis.register({ email, password });
      if (error) throw error;
      toast({
        title: 'Registration successful!',
        description: 'Please check your email to verify your account.',
        variant: 'default'
      });
      setActiveTab('login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: String(error),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await window.ezsite.apis.sendResetPwdEmail({ email });
      if (error) throw error;
      toast({
        title: 'Reset email sent!',
        description: 'Please check your email for the reset link.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Failed to send reset email',
        description: String(error),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure your passwords match.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await window.ezsite.apis.resetPassword({
        token: resetToken,
        password
      });
      if (error) throw error;
      toast({
        title: 'Password reset successful!',
        description: 'You can now login with your new password.',
        variant: 'default'
      });
      setActiveTab('login');
    } catch (error) {
      toast({
        title: 'Password reset failed',
        description: String(error),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-purple-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {activeTab === 'login' && 'Sign In'}
            {activeTab === 'register' && 'Create Account'}
            {activeTab === 'reset' && 'Reset Password'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="py-4">
            <form onSubmit={handleLogin} className="space-y-4" data-id="twgp7ypxg" data-path="src/components/auth/AuthModal.tsx">
              <div className="space-y-2" data-id="96oivb1zm" data-path="src/components/auth/AuthModal.tsx">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="bg-gray-800 border-gray-700" />

              </div>
              <div className="space-y-2" data-id="1fq34rbk5" data-path="src/components/auth/AuthModal.tsx">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700" />

              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">

                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="text-center" data-id="enyajtsuu" data-path="src/components/auth/AuthModal.tsx">
                <button
                  type="button"
                  onClick={() => setActiveTab('reset')}
                  className="text-sm text-purple-400 hover:text-purple-300" data-id="k8s5gt4eh" data-path="src/components/auth/AuthModal.tsx">

                  Forgot password?
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className="py-4">
            <form onSubmit={handleRegister} className="space-y-4" data-id="uf04dllue" data-path="src/components/auth/AuthModal.tsx">
              <div className="space-y-2" data-id="k5w82t1xg" data-path="src/components/auth/AuthModal.tsx">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="bg-gray-800 border-gray-700" />

              </div>
              <div className="space-y-2" data-id="ubxom3jd0" data-path="src/components/auth/AuthModal.tsx">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700" />

              </div>
              <div className="space-y-2" data-id="wp1b8tzhu" data-path="src/components/auth/AuthModal.tsx">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700" />

              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">

                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="reset" className="py-4">
            {!resetToken ?
            <form onSubmit={handleResetRequest} className="space-y-4" data-id="7o6rpwipe" data-path="src/components/auth/AuthModal.tsx">
                <div className="space-y-2" data-id="5vzvh3m68" data-path="src/components/auth/AuthModal.tsx">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="bg-gray-800 border-gray-700" />

                </div>
                <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">

                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <div className="text-center" data-id="dbug97ask" data-path="src/components/auth/AuthModal.tsx">
                  <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-sm text-purple-400 hover:text-purple-300" data-id="jisea91zg" data-path="src/components/auth/AuthModal.tsx">

                    Back to Login
                  </button>
                </div>
              </form> :

            <form onSubmit={handleResetPassword} className="space-y-4" data-id="nnn6da42j" data-path="src/components/auth/AuthModal.tsx">
                <div className="space-y-2" data-id="qno0aouaz" data-path="src/components/auth/AuthModal.tsx">
                  <Label htmlFor="reset-token">Reset Token</Label>
                  <Input
                  id="reset-token"
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700" />

                </div>
                <div className="space-y-2" data-id="8gd74tjuw" data-path="src/components/auth/AuthModal.tsx">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700" />

                </div>
                <div className="space-y-2" data-id="2bh7c3h0b" data-path="src/components/auth/AuthModal.tsx">
                  <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                  <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700" />

                </div>
                <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">

                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            }
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>);

};

export default AuthModal;