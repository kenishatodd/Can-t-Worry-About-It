import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  getReminderSettings,
  isPushSupported,
  subscribeToReminders,
  unsubscribeFromReminders,
  updateReminderTime,
} from "@/lib/push";

function isPreviewHost(): boolean {
  const hostname = window.location.hostname;
  return (
    hostname.startsWith("id-preview--") ||
    hostname.startsWith("preview--") ||
    hostname === "lovableproject.com" ||
    hostname.endsWith(".lovableproject.com") ||
    hostname === "lovableproject-dev.com" ||
    hostname.endsWith(".lovableproject-dev.com") ||
    hostname === "beta.lovable.dev" ||
    hostname.endsWith(".beta.lovable.dev") ||
    hostname === "localhost"
  );
}

const browserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

const JournalReminders = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("12:00");
  const supported = isPushSupported();
  const inPreview = isPreviewHost();

  useEffect(() => {
    let active = true;

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      setSignedIn(Boolean(user));

      if (user) {
        try {
          const settings = await getReminderSettings();
          if (!active) return;
          if (settings) {
            setEnabled(settings.enabled);
            setTime(settings.reminder_time.slice(0, 5));
          }
        } catch {
          // Settings load failure is non-fatal
        }
      }
      if (active) setLoading(false);
    };

    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleToggle = async (next: boolean) => {
    setBusy(true);
    try {
      if (next) {
        await subscribeToReminders(`${time}:00`, browserTimezone());
        setEnabled(true);
        toast({
          title: "Reminders on",
          description: `We'll gently nudge you around ${time}.`,
        });
      } else {
        await unsubscribeFromReminders();
        setEnabled(false);
        toast({
          title: "Reminders off",
          description: "No more nudges. Your journal is here when you need it.",
        });
      }
    } catch (error) {
      toast({
        title: "Reminders not updated",
        description:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleTimeChange = async (value: string) => {
    setTime(value);
    if (!enabled) return;
    try {
      await updateReminderTime(`${value}:00`, browserTimezone());
      toast({
        title: "Reminder time updated",
        description: `We'll gently nudge you around ${value}.`,
      });
    } catch {
      toast({
        title: "Could not save the new time",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      aria-labelledby="journal-reminders-heading"
      className="w-full max-w-2xl mx-auto bg-card rounded-2xl p-6 md:p-8 shadow-soft"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-accent/20 p-3 text-accent-foreground shrink-0">
          <Bell className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h2 id="journal-reminders-heading" className="font-serif text-2xl text-primary mb-1">
            Gentle Journal Reminders
          </h2>
          <p className="text-muted-foreground text-sm">
            A quiet nudge at a time you choose, reminding you to check in with yourself.
          </p>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Loading reminder settings…
          </div>
        ) : !supported ? (
          <p className="text-sm text-muted-foreground">
            This browser doesn't support push notifications. On iPhone, install CWAI to your Home
            Screen first, then enable reminders from the installed app.
          </p>
        ) : inPreview ? (
          <p className="text-sm text-muted-foreground">
            Reminders activate in the published app. Publish the site, open it on your device, and
            turn them on here.
          </p>
        ) : !signedIn ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Sign in to turn on gentle reminders on this device.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/auth">Sign in to enable reminders</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="reminders-toggle" className="text-sm font-medium text-foreground">
                {enabled ? "Reminders are on" : "Reminders are off"}
              </label>
              <Switch
                id="reminders-toggle"
                checked={enabled}
                disabled={busy}
                onCheckedChange={handleToggle}
                aria-label="Toggle journal reminders"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label htmlFor="reminder-time" className="text-sm font-medium text-foreground">
                Remind me at
              </label>
              <Input
                id="reminder-time"
                type="time"
                value={time}
                disabled={busy}
                onChange={(event) => handleTimeChange(event.target.value)}
                className="w-32"
              />
            </div>

            {enabled && (
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <BellOff className="h-3.5 w-3.5" aria-hidden="true" />
                Turn off anytime. Your reminder lives only on this device.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JournalReminders;
