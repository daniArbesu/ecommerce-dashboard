'use client';

import { useStoreModal } from '@/hooks/useStoreModal';
import Modal from '../ui/modal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import type { CreateStoreAPIResponse } from '@/types';

const formSchema = z.object({
  name: z.string().min(1)
});

const StoreModal = () => {
  const store = useStoreModal();

  const [loading, setLoading] = useState(false); // disable form if it's submiting

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response: CreateStoreAPIResponse = await axios.post('/api/stores', values);
      console.log(response);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Something went wrong.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store and manage your products from there"
      isOpen={store.isOpen}
      onClose={store.onClose}
    >
      <section>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="E-commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" disabled={loading} onClick={store.onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </Modal>
  );
};

export default StoreModal;
