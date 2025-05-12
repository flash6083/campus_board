import { auth, signIn, signOut } from "@/auth";
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
                            <Link href="/campus/create">
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type="submit">Log out</button>
                            </form>
                            <Link href={`/user/${session?.user.id}`}>
                                <span>{session.user.name}</span>
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