import { auth, signIn, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
    const session = await auth();
    return (
        <header className="px-12 py-5 bg-white drop-shadow-sm font-manrope font-medium text-sm">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" className="w-full h-auto" width={40} height={30} alt="logo"/>
                </Link>
                <div className="flex items-center gap-5 text-black sm:text-[17px] text-[12px]">
                    {session && session.user ? (
                        <>
                            <Link href="/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type="submit">
                                    <span className="max-sm:hidden">Sign out</span>
                                    <LogOut className="size-6 sm:hidden text-red-500"/>
                                </button>
                                
                            </form>
                            <Link href={`/user/${session?.user.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ):

                    (
                        <form action={async () => {
                            "use server";
                            await signIn("google")
                         }}>
                            <button type="submit">Login</button>
                        </form>
                    )

                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar