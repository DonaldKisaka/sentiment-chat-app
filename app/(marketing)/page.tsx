import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Analyze{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Sentiment
            </span>{" "}
            in Real-Time{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Chat
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Understand emotions and sentiment in your conversations instantly. 
            Chat with AI-powered sentiment analysis, get real-time feedback, 
            and improve communication with advanced emotion detection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/signup"> 
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              Start Chatting
              </Button>
            </Link>
            
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-sm md:text-base">Emotion Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span className="text-sm md:text-base">Real-Time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-blue-500" />
              <span className="text-sm md:text-base">Smart Conversations</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;