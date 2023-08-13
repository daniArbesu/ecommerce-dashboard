import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function SetupPage() {
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
