"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}
const menuItems: MenuItem[] = [
  { name: "Blog", href: "/" },
  { name: "About", href: "/about" },
];
export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden md:flex items-center">
        {menuItems.map((item) => (
          <div key={item.href} className="ml-4 md:ml-8">
            <Link
              href={item.href}
              target={item.openInNewTab ? "_blank" : "_self"}
              className={cn(
                "hover:text-gray-900 dark:hover:text-gray-100 transition-colors relative z-10 px-2 py-1",
                pathname === item.href ? "font-semibold" : ""
              )}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size="24" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    className={cn(
                      "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors w-full text-left",
                      pathname === item.href ? "font-semibold bg-gray-100 dark:bg-gray-800" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  return (
    <section className="flex items-center justify-between mt-8 md:mt-16 mb-12">
      <Link href="/">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
          {config.blog.name}
        </h1>
      </Link>
      <Navigation />
    </section>
  );
};
