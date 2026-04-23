import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Server, Users, Laptop, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { data: summary, isLoading } = useGetDashboardSummary();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
      title: "Authentication Successful",
      description: "Welcome back to Asset Tracker.",
    });
    
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex bg-muted/30">
      {/* Left side: Brand & Dashboard Summary */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-primary-foreground/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] rounded-full bg-primary-foreground/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 rounded-lg bg-primary-foreground flex items-center justify-center">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Asset Tracker</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-semibold leading-tight mb-6">
              Enterprise Asset Management
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-12">
              Track, assign, and manage your company's hardware fleet with complete visibility and precision.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wider mb-6">
            System Overview
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20">
                  <Skeleton className="h-5 w-5 bg-primary-foreground/20 mb-3" />
                  <Skeleton className="h-8 w-16 bg-primary-foreground/20 mb-1" />
                  <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
                </div>
              ))}
            </div>
          ) : summary ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
                <Laptop className="h-5 w-5 text-primary-foreground/80 mb-3" />
                <div className="text-3xl font-bold mb-1">{summary.totalAssets}</div>
                <div className="text-sm text-primary-foreground/80">Total Assets</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300 delay-75">
                <Users className="h-5 w-5 text-primary-foreground/80 mb-3" />
                <div className="text-3xl font-bold mb-1">{summary.totalEmployees}</div>
                <div className="text-sm text-primary-foreground/80">Employees</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300 delay-150">
                <Activity className="h-5 w-5 text-primary-foreground/80 mb-3" />
                <div className="text-3xl font-bold mb-1">{summary.activeAssignments}</div>
                <div className="text-sm text-primary-foreground/80">Active Assignments</div>
              </div>
            </div>
          ) : (
             <div className="text-primary-foreground/70 text-sm italic">
                System overview currently unavailable.
             </div>
          )}
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <Server className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Asset Tracker</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to manage assets.
            </p>
          </div>

          <Card className="border-border/50 shadow-sm border-t-4 border-t-primary">
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="admin@company.com"
                            type="email"
                            autoComplete="email"
                            className="bg-muted/50 focus:bg-background transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <a
                            href="#"
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({
                                title: "Password Reset",
                                description: "Instructions have been sent to your email.",
                              });
                            }}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            autoComplete="current-password"
                            className="bg-muted/50 focus:bg-background transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      Sign in to Dashboard
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our corporate{" "}
            <a href="#" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
