
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, X, Send } from 'lucide-react';

const WriteFormSchema = z.object({
  fields: z.array(z.object({
    key: z.string().min(1, "Field name is required"),
    value: z.string().min(1, "Value is required")
  })).min(1, "At least one field is required")
});

type WriteFormValues = z.infer<typeof WriteFormSchema>;

interface NfcWriteFormProps {
  onSubmit: (data: Record<string, any>) => void;
}

const NfcWriteForm: React.FC<NfcWriteFormProps> = ({ onSubmit }) => {
  const form = useForm<WriteFormValues>({
    resolver: zodResolver(WriteFormSchema),
    defaultValues: {
      fields: [{ key: '', value: '' }]
    }
  });

  const addField = () => {
    const currentFields = form.getValues().fields;
    form.setValue('fields', [...currentFields, { key: '', value: '' }]);
  };

  const removeField = (index: number) => {
    const currentFields = form.getValues().fields;
    if (currentFields.length > 1) {
      form.setValue(
        'fields',
        currentFields.filter((_, i) => i !== index)
      );
    }
  };

  const handleSubmit = (values: WriteFormValues) => {
    // Convert array of fields to a simple object
    const data = values.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.key]: field.value
      }),
      {}
    );

    onSubmit(data);
  };

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-4">
            {form.watch('fields').map((_, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1 space-y-2">
                  <FormField
                    control={form.control}
                    name={`fields.${index}.key`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., name, id, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex-1 space-y-2">
                  <FormField
                    control={form.control}
                    name={`fields.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="Field value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-9"
                  onClick={() => removeField(index)}
                >
                  <X className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 border-dashed"
              onClick={addField}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </div>
          
          <Button 
            type="submit"
            className="w-full btn-gradient"
          >
            <Send className="mr-2 h-4 w-4" />
            Prepare to Write
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default NfcWriteForm;
