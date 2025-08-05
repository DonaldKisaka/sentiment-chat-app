import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const Nav = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
        <div className="container mx-auto px-4 flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="logo" width={32} height={32} />
                <span className="text-xl font-light">ChatSphere</span>
            </Link>

            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center space-x-4">
                    <Link href='/signin'>
                        <Button variant="outline" className="cursor-pointer">
                            Sign In
                        </Button>
                    </Link>

                    <Link href='/signup'>
                        <Button className="cursor-pointer">
                            Sign Up
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav
