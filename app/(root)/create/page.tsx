import { auth } from "@/auth";
import StickieForm from "@/components/StickieForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session  = await auth();
  if(!session) redirect("/");
  return (
    <>
      <section className="pink_container pattern !min-h-[330px]">
        <h1 className="heading">Create your stickie</h1>
      </section>
      <StickieForm/>
    </>
  )
}

export default page