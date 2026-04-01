import { use } from "react";
import ViewContext from "../contexts/ViewContext";

const useView = () => {
    const context = use(ViewContext)

    if(!context) {
        throw Error('useUser needs to be inside UserContext')
    }

    return context
}

export default useView