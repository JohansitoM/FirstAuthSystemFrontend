import { GoogleLogin } from '@react-oauth/google'

function GoogleLoginButton({ onSuccess, onError }) {
    return (
        <div className='m-4'>
            <GoogleLogin 
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    )
}

export default GoogleLoginButton;