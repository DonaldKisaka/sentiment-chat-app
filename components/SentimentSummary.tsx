"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown } from "lucide-react";

interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
  pending?: number;
}

interface SentimentSummaryProps {
  stats?: SentimentStats;
}

export default function SentimentSummary({
  stats = {
    positive: 45,
    neutral: 35,
    negative: 20,
    pending: 0,
  },
}: SentimentSummaryProps) {
  // Calculate total for percentages (excluding pending)
  const total = stats.positive + stats.neutral + stats.negative || 1;

  // Determine overall sentiment based on highest count
  const getOverallSentiment = (): "positive" | "neutral" | "negative" => {
    if (stats.positive >= stats.neutral && stats.positive >= stats.negative) {
      return "positive";
    } else if (stats.negative >= stats.neutral) {
      return "negative";
    } else {
      return "neutral";
    }
  };

  const overallSentiment = getOverallSentiment();

  // Get sentiment icon based on overall sentiment
  const getSentimentIcon = () => {
    switch (overallSentiment) {
      case "positive":
        return <Smile className="h-6 w-6 text-green-500" />;
      case "neutral":
        return <Meh className="h-6 w-6 text-amber-500" />;
      case "negative":
        return <Frown className="h-6 w-6 text-red-500" />;
      default:
        return <Meh className="h-6 w-6 text-amber-500" />;
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Conversation Sentiment</CardTitle>
          <Badge
            variant={
              overallSentiment === "positive"
                ? "default"
                : overallSentiment === "negative"
                  ? "destructive"
                  : "secondary"
            }
            className="flex items-center gap-1"
          >
            {getSentimentIcon()}
            <span className="capitalize">{overallSentiment}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <Smile className="mr-1 h-4 w-4 text-green-500" /> Positive
              </span>
              <span>{Math.round((stats.positive / total) * 100)}%</span>
            </div>
            <Progress
              value={(stats.positive / total) * 100}
              className="h-2 bg-muted"
            >
              <div
                className="h-full bg-green-500"
                style={{ width: `${(stats.positive / total) * 100}%` }}
              />
            </Progress>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <Meh className="mr-1 h-4 w-4 text-amber-500" /> Neutral
              </span>
              <span>{Math.round((stats.neutral / total) * 100)}%</span>
            </div>
            <Progress
              value={(stats.neutral / total) * 100}
              className="h-2 bg-muted"
            >
              <div
                className="h-full bg-amber-500"
                style={{ width: `${(stats.neutral / total) * 100}%` }}
              />
            </Progress>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <Frown className="mr-1 h-4 w-4 text-red-500" /> Negative
              </span>
              <span>{Math.round((stats.negative / total) * 100)}%</span>
            </div>
            <Progress
              value={(stats.negative / total) * 100}
              className="h-2 bg-muted"
            >
              <div
                className="h-full bg-red-500"
                style={{ width: `${(stats.negative / total) * 100}%` }}
              />
            </Progress>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
