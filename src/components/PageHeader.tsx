import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import HeaderMenu from "./HeaderMenu";
import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white">
      <div className="relative w-full max-w-screen-xl px-2.5 lg:px-20 border-b mx-auto">
        <div className="flex h-14 items-center justify-between">
          <Link href="/">
            <h1>Feedly</h1>
          </Link>
          <div>
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="ml-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <HeaderMenu />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
