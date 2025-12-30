import { useState } from "react";
import { AuthError, getProfile, login } from "./auth.service";
import Swal from "sweetalert2";
import { useAuthStore } from "./auth.store";
import { Button, Input, Label } from "@/components/ui";

const Login = () => {
    const [dataForm, setDataForm] = useState({ username: '', password: '' });
    const { setToken, setUser } = useAuthStore()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const data = await login(dataForm.username, dataForm.password)
            setToken(data.token)
            const profile = await getProfile(data.token)
            setUser(profile)
        } catch (error) {
            if (error instanceof AuthError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                })
            }
        }
    }


    return (
        <div className="flex h-fit min-h-screen w-full">
            <div className="w-2/3 flex items-center justify-center bg-gray-200">
                <img className="w-1/2" src="images/login-security.svg" alt="leftSideImage" />
            </div>

            <div className="w-1/3 flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit} className="md:w-100 w-80 flex flex-col items-start justify-center">
                    <h2 className="text-xl text-gray-900 font-bold">Bienvenido a MEG</h2>
                    <p className="text-sm text-gray-500/90 mt-1 mb-5">Modelo de Entregas Garantizadas</p>

                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="username">
                            Usuario
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="miusuario"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const t = e.target as HTMLInputElement;
                                setDataForm({ ...dataForm, username: t.value });
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-3 mt-6">
                        <Label htmlFor="password">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="* * * * * * * *"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const t = e.target as HTMLInputElement;
                                setDataForm({ ...dataForm, password: t.value });
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                }
                            }} />
                    </div>

                    <Button type="submit" className="mt-8 w-full h-11 rounded-lg text-white bg-blue-500 hover:opacity-90 transition-opacity">
                        Iniciar Sesión
                    </Button>

                    <p className="w-full text-center text-sm text-gray-600/90 mt-5">Distribuciones Pharmaser LTDA.</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
