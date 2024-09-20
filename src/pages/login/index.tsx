import { useCallback, useEffect } from "react";
import Spinner from "@/components/customUI/Loaders/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateTokenForAuthMutation } from '@/store/hes/hesApi';
import { CustomHesApiError } from "@/store/hes/types/other";
import { useToast } from "@/components/ui/use-toast"
import ErrorScreen from "@/components/customUI/ErrorScreen";

const Login = () => {

    const [updateToken, { isError, error }] = useUpdateTokenForAuthMutation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { state } =  useLocation();
    const redirectUrl = state?.redirectUrl || "/hes";

    const handleToken = useCallback(async () => {
        try {
            const { token } = await updateToken({
                authID: "bdf234d4-e1bb-4df3-a27e-433d596b808c" 
                // import.meta.env.VITE_HES_AUTH_ID
            }).unwrap();
            sessionStorage.setItem('hes_token', token);
            navigate(redirectUrl)
        } catch (error) {
            const errorObj = error as CustomHesApiError;
            let errorMsg = "Failed to fetch HES token"
            if (errorObj.data && errorObj.data.error && errorObj.data.error.errorMsg) {
                errorMsg = errorObj.data.error.errorMsg;
            }
            toast({
                variant: "destructive",
                title: "Failed to authenticate",
                description: errorMsg,
            })
        }
    },  [ updateToken, navigate, toast, redirectUrl ])

    useEffect(() => {
        handleToken()
    }, [ ]);

    if(isError) return <ErrorScreen error={error} />

    return (
        <div className="px-5 py-3 w-full flex items-center flex-col justify-center h-screen">
            <h1 className="mb-3">Authenticating...</h1>
            <Spinner />
        </div>
    )
}

export default Login