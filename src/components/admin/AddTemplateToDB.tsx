import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TEMPLATE_DATA = [
{
  template_id: "modern-yellow",
  template_name: "Modern Yellow",
  template_display_name: "Modern Yellow",
  template_description: "A bold modern template with striking yellow accents",
  template_category: "modern",
  template_component: "ModernYellowTemplate",
  allow_image_upload: true,
  rating: 4.9,
  downloads: 785
}];


const AddTemplateToDB = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddTemplates = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const template of TEMPLATE_DATA) {
        // Check if template already exists
        const checkResponse = await window.ezsite.apis.tablePage(7746, {
          PageNo: 1,
          PageSize: 1,
          Filters: [
          {
            name: "template_id",
            op: "Equal",
            value: template.template_id
          }]

        });

        if (checkResponse.error) throw checkResponse.error;

        if (checkResponse.data.List && checkResponse.data.List.length > 0) {
          console.log(`Template ${template.template_id} already exists, updating...`);

          // Update existing template
          const updateResponse = await window.ezsite.apis.tableUpdate(7746, {
            id: checkResponse.data.List[0].id,
            ...template
          });

          if (updateResponse.error) throw updateResponse.error;
        } else {
          console.log(`Adding new template: ${template.template_id}`);

          // Create new template
          const createResponse = await window.ezsite.apis.tableCreate(7746, template);

          if (createResponse.error) throw createResponse.error;
        }
      }

      setSuccess('Templates added successfully!');
      toast({
        title: "Success",
        description: "Resume templates have been added to the database."
      });
    } catch (err) {
      console.error('Error adding templates:', err);
      setError(typeof err === 'string' ? err : 'Failed to add templates');
      toast({
        title: "Error",
        description: "Failed to add templates to the database.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Template to Database</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          This will add the Modern Yellow template to the database.
        </p>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        
        <Button
          onClick={handleAddTemplates}
          disabled={isLoading}
          className="w-full">

          {isLoading ?
          <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Adding Templates...
            </> :

          'Add Templates to Database'
          }
        </Button>
      </CardContent>
    </Card>);

};

export default AddTemplateToDB;