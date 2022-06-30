import { useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'
import { getLoadingState } from "../store/reducers";

const LoaderOverlary = ({ children }) => {
    const state = useSelector((state) => getLoadingState(state));
    return (
        <LoadingOverlay
            active={state}
            spinner
            text='Loading. Please wait ....'
        >
            {children}
        </LoadingOverlay>
    )
}

export default LoaderOverlary