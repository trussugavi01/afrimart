import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AfrimartLogo } from '@/components/AfrimartLogo';
import { Briefcase, Users, Globe, LucideProps } from 'lucide-react';
const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <AfrimartLogo />
        <div className="space-x-4">
          <Button asChild variant="ghost" className="text-foreground hover:bg-accent">
            <Link to="/login">Member Login</Link>
          </Button>
          <Button asChild variant="ghost" className="text-foreground hover:bg-accent">
            <Link to="/blog">Blog</Link>
          </Button>
          <Button asChild className="bg-brand hover:bg-green-600 text-white">
            <Link to="/signup">Join Now</Link>
          </Button>
        </div>
      </div>
    </div>
  </header>
);
const HeroSection = () => (
  <section className="text-center pt-32 pb-24 md:pt-48 md:pb-32">
    <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
      Africa's Premier Agricultural Network
    </h1>
    <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      Connecting farmers, suppliers, and businesses to foster growth and sustainability in the African agricultural sector.
    </p>
    <div className="space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <Button asChild size="lg" className="bg-brand hover:bg-green-600 text-white px-8 py-6 text-base">
        <Link to="/signup">Join the Network</Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="px-8 py-6 text-base">
        <Link to="/login">Member Login</Link>
      </Button>
    </div>
  </section>
);
interface FeatureCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  description: string;
}
const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow duration-300 bg-white">
    <CardHeader className="items-center">
      <div className="bg-brand-light rounded-full p-3 mb-4 inline-flex">
        <Icon className="w-8 h-8 text-brand" />
      </div>
      <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
const WhyJoinSection = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-foreground">Why Join Afrimart Agro Trade?</h2>
      <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4">
        Unlock opportunities and drive your agricultural business forward with our comprehensive platform.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        icon={Briefcase}
        title="Business Opportunities"
        description="Access a vast network of buyers and suppliers. Find new markets for your products and source high-quality inputs."
      />
      <FeatureCard
        icon={Users}
        title="Community & Collaboration"
        description="Connect with fellow farmers, agronomists, and industry experts. Share knowledge and collaborate on projects."
      />
      <FeatureCard
        icon={Globe}
        title="Market Insights"
        description="Stay ahead with real-time market data, price trends, and agricultural news tailored to the African context."
      />
    </div>
  </section>
);
interface StatItemProps {
  value: string;
  label: string;
}
const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-center">
    <p className="text-4xl md:text-5xl font-bold text-brand">{value}</p>
    <p className="text-muted-foreground mt-2">{label}</p>
  </div>
);
const StatsSection = () => (
  <section className="py-16 md:py-24">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <StatItem value="10,000+" label="Active Farmers" />
      <StatItem value="5,000+" label="Verified Suppliers" />
      <StatItem value="20+" label="Countries" />
      <StatItem value="1M+" label="Tonnes Traded" />
    </div>
  </section>
);
const FinalCTASection = () => (
  <section className="py-16 md:py-24 text-center bg-white rounded-xl shadow-soft">
    <h2 className="text-4xl font-bold text-foreground">Ready to Grow Your Business?</h2>
    <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4 mb-8">
      Join Afrimart today and become part of a thriving agricultural community dedicated to success.
    </p>
    <Button asChild size="lg" className="bg-brand hover:bg-green-600 text-white px-10 py-6 text-lg">
      <Link to="/signup">Get Started Now</Link>
    </Button>
  </section>
);
const Footer = () => (
  <footer className="mt-16 md:mt-24">
    <div className="border-t py-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <AfrimartLogo />
      <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Afrimart Agro Trade. All rights reserved.</p>
    </div>
  </footer>
);
export function HomePage() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WhyJoinSection />
        <StatsSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  );
}