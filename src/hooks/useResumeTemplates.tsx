import { useState, useEffect } from 'react';
import { EXTENDED_TEMPLATES, TemplateData } from '@/data/resumeTemplates';

interface DatabaseTemplate {
  id: number;
  template_id: string;
  template_name: string;
  template_display_name: string;
  template_description: string;
  template_category: string;
  template_component: string;
  template_thumbnail: string;
  allow_image_upload: boolean;
  rating: number;
  downloads: number;
}

const useResumeTemplates = () => {
  const [templates, setTemplates] = useState<TemplateData[]>(EXTENDED_TEMPLATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch templates from database
        const response = await window.ezsite.apis.tablePage(7746, {
          PageNo: 1,
          PageSize: 100,
          OrderByField: "template_id",
          IsAsc: true
        });

        if (response.error) throw response.error;

        if (response.data.List && response.data.List.length > 0) {
          // Convert database templates to TemplateData format
          const dbTemplates = response.data.List.map((item: DatabaseTemplate) => ({
            id: item.template_id,
            name: item.template_name,
            displayName: item.template_display_name,
            rating: item.rating,
            downloads: item.downloads,
            category: item.template_category as 'professional' | 'modern' | 'basic' | 'creative' | 'simple',
            allowImageUpload: item.allow_image_upload,
            description: item.template_description,
            component: item.template_component,
            thumbnail: item.template_thumbnail // Used for thumbnails
          }));

          // Combine with existing templates, giving priority to DB templates
          const existingTemplateIds = dbTemplates.map((t) => t.id);
          const remainingTemplates = EXTENDED_TEMPLATES.filter((t) => !existingTemplateIds.includes(t.id));

          setTemplates([...dbTemplates, ...remainingTemplates]);
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(typeof err === 'string' ? err : 'Failed to load templates');
        // Fallback to static templates if fetch fails
        setTemplates(EXTENDED_TEMPLATES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return { templates, isLoading, error };
};

export default useResumeTemplates;