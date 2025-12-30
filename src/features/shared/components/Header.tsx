import type { FC } from "react";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconPower } from "@/svg";
import { useSessionManager } from "../hooks";
import { useAuthStore } from "@/features/auth/auth.store";
import Swal from "sweetalert2";

interface HeaderProps {
  title: string;
  subItem?: string;
  button?: React.ReactNode;
}

export const Header: FC<HeaderProps> = ({
  title,
  subItem,
  button,
}) => {
  const logout = useAuthStore((e) => e.logout);
  const { getUsername } = useSessionManager();

  const logoutHandler = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        logout();
      }
    })
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        {subItem && (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h2 className="text-sm font-medium">{subItem}</h2>
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          {button && <>{button}</>}
          <Button className="hidden sm:flex border border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-transparent rounded-2xl text-gray-800 font-medium" onClick={logoutHandler}>
            <>
              {getUsername()}
              <IconPower />
            </>
          </Button>
        </div>
      </div>
    </header>
  );
};
