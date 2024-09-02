import { useLocation } from 'react-router-dom';

const useGetBasePath = (pathIndex?: number ) => {
    const { pathname } = useLocation();
    const urlSegments = pathname.split("/").filter(segment => segment !== '');
    const lastUrlSegment = pathIndex !== undefined ? urlSegments[pathIndex] : urlSegments.pop();
    const basePath = lastUrlSegment === 'vee' ? "validation": lastUrlSegment;
    return basePath as string;
}

export default useGetBasePath