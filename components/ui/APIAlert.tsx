'use client';

import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Badge, type BadgeProps } from './badge';
import { Button } from './button';
import { toast } from 'sonner';

interface Props {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<Props['variant'], string> = {
  public: 'Public',
  admin: 'Admin'
};

const variantMap: Record<Props['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive'
};

const APIAlert: React.FC<Props> = ({ title, description, variant = 'public' }) => {
  const onCopy = () => {
    void navigator.clipboard.writeText(description);
    toast.success('API Route copied to the clipboard');
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between gap-4">
        <code className="relative rounded-lg bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default APIAlert;
