import { cn } from '@/lib/utils';
import ResetFilters from '../ResetFilters';

export type APIError = { 
  data?: {  
    error?: { 
      errorMsg?: string;
      errorCode?: string; 
    }
  },
  status: string;
}

interface ErrorScreenProps<T>{
  error: object;
  customCss?: string;
  customReset?: {
    defaultValue: T;
    clearFilters: React.Dispatch<React.SetStateAction<T>>;
},
}

function ErrorScreen<T>({ error, customCss, customReset }: ErrorScreenProps<T>){
  const errorData = error as APIError;
  return (
    <div className='w-full'>
      {customReset && <ResetFilters customReset={customReset} />}
      {errorData.data && errorData.data.error && errorData.data.error.errorMsg ?
        <div className={
          cn("w-full flex flex-col items-center justify-center text-center h-[80vh] text-center", customCss)}
        >
          <h2 className="text-2xl text-bold capitalize">{errorData.data.error.errorMsg}</h2>
          <p className="text-md italic">Status: {errorData.data.error.errorCode}</p>
        </div>
        :
        <div className={
          cn("w-full flex flex-col items-center justify-center text-center h-[80vh] text-center", customCss)}
        >
          <h2 className="text-2xl text-bold">Something went wrong, please refresh the page</h2>
          <p className="text-md italic">Status: {errorData.status}</p>
        </div>
      }
    </div>
  );
}

export default ErrorScreen