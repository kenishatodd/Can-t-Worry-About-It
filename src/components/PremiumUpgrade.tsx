import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Crown, Check, Loader2 } from 'lucide-react';

const PREMIUM_FEATURES = [
  'Full Capacity Checker results & insights',
  'Complete CWAI Guide chapters',
  'Pause Tool audio experiences',
  'Journal with guided prompts',
  'Priority support',
];

const PremiumUpgrade = () => {
  const { session, isSubscribed, checkSubscription } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!session) {
      toast.error('Please sign in to subscribe');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        toast.error('Failed to start checkout. Please try again.');
        console.error('Checkout error:', error);
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        toast.error('Failed to open subscription management.');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="border-sage/50 bg-sage/10">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage/30 mx-auto mb-2">
            <Crown className="w-6 h-6 text-sage-dark" />
          </div>
          <CardTitle className="font-serif text-xl">Premium Member</CardTitle>
          <CardDescription>You have full access to all features</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            variant="outline" 
            onClick={handleManageSubscription}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Manage Subscription
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gold/50 shadow-soft overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="text-center pb-4 relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/30 mx-auto mb-3">
          <Crown className="w-7 h-7 text-gold-dark" />
        </div>
        <CardTitle className="font-serif text-2xl">CWAI Premium</CardTitle>
        <CardDescription className="text-base">
          Unlock your complete wellness journey
        </CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-serif font-semibold text-foreground">$4.99</span>
          <span className="text-muted-foreground"> one-time</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        <ul className="space-y-3">
          {PREMIUM_FEATURES.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-sage-dark shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full bg-gold hover:bg-gold-dark text-foreground" 
          onClick={handleUpgrade}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Loading...
            </>
          ) : (
            'Unlock Premium Access'
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Lifetime access. Secure payment via Stripe.
        </p>
      </CardContent>
    </Card>
  );
};

export default PremiumUpgrade;
