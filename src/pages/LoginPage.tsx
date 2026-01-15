import logo from "../assets/logo-jessval.png";

const LoginPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
                <img
                    src={logo}
                    alt="Logo Jessval"
                    width={300}
                    height={100}
                    className="mx-auto mb-8"
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Acceso Requerido
                </h1>
                <p className="text-gray-600 mb-8">
                    Por favor, accede a través del enlace de autenticación proporcionado.
                </p>
                <p className="text-sm text-gray-500">
                    Si tienes problemas, contacta al administrador.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
