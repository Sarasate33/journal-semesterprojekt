import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  return (
    <header>
      <nav>
        <div className=" py-5 px-5 flex justify-between items-center">
          <div className="flex items-center">
            <Link href={"/"}>
              <h1 className="text-3xl font-bold">Journal</h1>
            </Link>
          </div>
          <div className="flex items-center justify-end ml-auto">
            <Link href="/create">
              <Button variant="default" className="">
                <PenBox size={18} />
                <span className="hidden md:inline">Write new</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
