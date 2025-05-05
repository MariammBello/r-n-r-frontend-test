import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from 'lucide-react';

interface WorkInProgressProps {
  pageName?: string; // Optional prop to specify which page is WIP
  title: string;
  description: string;
}

export default function WorkInProgress({ pageName }: WorkInProgressProps) {
  const title = pageName ? `${pageName} Page` : "This Page";

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto border-yellow-500 border-2 bg-yellow-50/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Construction size={48} className="text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-yellow-800">
            {title} is Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-yellow-700">
          <p>This feature is currently being developed. Please check back later!</p>
          {/* You can add a link back to the homepage or another relevant page if needed */}
          {/* Example:
          <Link href="/" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Homepage
          </Link>
          */}
        </CardContent>
      </Card>
    </div>
  );
}
