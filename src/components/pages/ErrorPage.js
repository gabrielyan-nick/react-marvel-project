import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
 <ErrorMessage />
 <p style={{'textAlign': 'center', 'marginTop': '20px', 'fontSize': '24px', 'fontWeight': 'bold'}}>
   Page doesn't exist
 </p>
<Link to={'/'}
style={{'display': 'block', 'textAlign': 'center', 'marginTop': '20px', 'fontSize': '24px', 'fontWeight': 'bold'}}>Go back</Link>
    </div>
    
  );
}

export default ErrorPage;
