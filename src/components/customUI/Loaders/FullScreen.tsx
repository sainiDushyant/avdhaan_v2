import { FC } from "react";
import Spinner from "./Spinner";

interface FullScreenProps {
  hasSpinner?: boolean
}

const FullScreen: FC<FullScreenProps> = (props) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {props.hasSpinner ? <Spinner /> :
        <p className="text-2xl text-bold">Loading...</p>
      }
    </div>
  );
};

export default FullScreen;
