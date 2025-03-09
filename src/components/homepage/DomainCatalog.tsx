
import React from 'react';
import { 
  Card, CardContent 
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight, ChevronRight, BookOpen } from 'lucide-react';

const DomainCatalog = () => {
  const navigate = useNavigate();
  
  // Mock data for domains
  const domains = [
    'Technology', 'Leadership', 'Business', 'Data Science', 
    'Marketing', 'Design', 'Product', 'Finance', 'HR', 'Operations'
  ];
  
  const handleDomainClick = (domain: string) => {
    // Convert domain name to a simple ID format
    const domainId = domain.toLowerCase().replace(/\s/g, '-');
    navigate(`/domain/${domainId}`);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-sm">
      <CardContent className="py-6 px-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Domains Catalog</h2>
            <Button 
              variant="link" 
              className="flex items-center gap-1 p-0 text-blue-600"
              onClick={() => navigate('/view-all/domains')}
            >
              View All <MoveRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Domain links in a grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {domains.map((domain) => (
              <Button
                key={domain}
                variant="ghost"
                className="justify-between hover:bg-blue-100/50"
                onClick={() => handleDomainClick(domain)}
              >
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  {domain}
                </span>
                <ChevronRight className="h-4 w-4 text-blue-600" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainCatalog;
