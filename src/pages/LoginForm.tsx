import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiSpacer,
  EuiFieldPassword,
} from "@elastic/eui";
import { Link } from "react-router-dom";



const LoginForm = () =>  {
  
  return (
    <div>
      <EuiForm component="form">
          <EuiFieldText
            icon="email"
            placeholder="Enter your email"
            aria-label="Enter your email."
          />
         <EuiSpacer size="m" />
          <EuiFieldPassword
            placeholder="Enter your password"
            type="dual"
            aria-label="Enter your password."
          />
           <EuiSpacer size="m" />
        <EuiButton type="submit" fill style={{width: "100%"}}>
          Submit
        </EuiButton>
      </EuiForm>
    </div>
  )
}

export default LoginForm;