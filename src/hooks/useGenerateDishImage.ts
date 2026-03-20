import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useGenerateDishImage() {
  const [generating, setGenerating] = useState(false);

  const generateImage = async (dishName: string): Promise<string | null> => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-dish-image', {
        body: { dishName },
      });

      if (error) {
        console.error('Image generation error:', error);
        toast.error('Failed to generate image. You can retry later.');
        return null;
      }

      if (data?.error) {
        toast.error(data.error);
        return null;
      }

      return data?.imageUrl ?? null;
    } catch (err) {
      console.error('Image generation error:', err);
      toast.error('Failed to generate image.');
      return null;
    } finally {
      setGenerating(false);
    }
  };

  return { generateImage, generating };
}
