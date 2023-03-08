import './errorMessage.scss';
import error from '../../resources/gif/Error_404_Flag.webp';
export const ErrorMessage = () => {
    return (
        <div className="error-message">
            <img src={error} alt="error-message"/>
        </div>
    )
}