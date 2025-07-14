import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  return (
    <header>
      <nav className="py-5 flex justify-between items-center  ">
        <Link href={"/"}>
          <h1 className="px-9 py-3 text-3xl font-bold">
            Journal
          </h1>
        </Link>

        <div className="flex items-center px-5">
          <Link href="/create">
            <Button variant="default" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Write new</span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
