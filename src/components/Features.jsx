import {
  BarChart3,
  Shield,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose CodeTrackr?
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            The ultimate platform for competitive programmers to track progress,
            compare performance, and stay motivated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            Icon={Trophy}
            title="Real-time Leaderboards"
            description="Live rankings across multiple coding platforms with instant score updates and percentile calculations."
          />
          <FeatureCard
            Icon={TrendingUp}
            title="Performance Analytics"
            description="Detailed insights into your coding journey with progress tracking and trend analysis."
          />
          <FeatureCard
            Icon={Users}
            title="Handle Management"
            description=" Securely manage your coding platform handles with Google OAuth integration."
          />
          <FeatureCard
            Icon={Shield}
            title="Secure Authentication"
            description="Enterprise-grade security with Google OAuth and JWT tokens for safe data access."
          />
          <FeatureCard
            Icon={Zap}
            title="Automated Scraping"
            description="Continuous data collection from top coding platforms with scheduled updates."
          />
          <FeatureCard
            Icon={BarChart3}
            title="Comprehensive Stats"
            description="Rich statistics including contest participation, rating changes, and performance metrics."
          />
        </div>
      </div>
    </section>
  );
};
export default Features;
