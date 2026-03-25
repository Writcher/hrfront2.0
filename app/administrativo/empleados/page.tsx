import { auth } from "@/auth";
import PageWrapper from "@/components/common/wrappers/pageWrapper";
import Empleados from "@/components/empleados";
import { redirect } from "next/navigation";

export default async function AdministrativoEmpleadosPage() {
    const session = await auth();
    if (!session) redirect('/');

    return (
        <PageWrapper title='Empleados'>
            <Empleados esAdministrativo={session?.user?.tipoUsuario === 'Administrativo'}/>
        </PageWrapper>
    );
};