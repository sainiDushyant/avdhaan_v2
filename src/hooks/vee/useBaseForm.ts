import { useState } from "react";

const useBaseForm = ({ name, description } : { name?: string; description?: string }) => {
    const [ baseState, setBaseState ] = useState({ 
        name: name || "", 
        description: description || "" 
    });
    return {
        baseState, 
        setBaseState
    }
}

export default useBaseForm