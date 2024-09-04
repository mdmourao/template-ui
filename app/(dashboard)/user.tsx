import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import axios from 'axios';

export async function User() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <form
            action={async () => {
              'use server';
              axios.post('/api/logout').then(() => {
                window.location.reload();
              }).catch((error) => {
                console.error(error);
              });
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/login">Sign In</Link>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
