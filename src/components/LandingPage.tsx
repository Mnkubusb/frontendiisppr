import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">JobTrackr</h1>
        </div>
        <nav>
          <Link to="/dashboard">
            <Button variant="ghost">Sign In</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Organize Your Job Search Journey
          </h1>
          <p className="text-xl text-muted-foreground">
            Track applications, manage interviews, and land your dream job with
            our simple yet powerful job application tracking system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-md aspect-square bg-muted rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
            alt="Job tracking dashboard"
            className="object-cover w-full h-full"
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 JobTrackr. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
