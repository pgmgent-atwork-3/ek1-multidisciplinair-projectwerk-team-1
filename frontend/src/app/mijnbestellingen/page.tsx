import { redirect } from "next/navigation";

const redirectPage= () =>{
    redirect(`/api/auth/signin?callbackUrl=/`)
}

export default redirectPage