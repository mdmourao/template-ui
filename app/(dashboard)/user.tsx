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
import customFetch from '../helpers/axios';
import toast from 'react-hot-toast';

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

          <button onClick={() => {
            customFetch.post("api/logout").then((r) => {
              toast.success("signed out")
              window.location.href = "/login"
            }).catch((r) => {
              toast.error("error signing out")
              window.location.href = "/login"
            })
          }}>Sign Out</button>

        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/login">Sign In</Link>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
