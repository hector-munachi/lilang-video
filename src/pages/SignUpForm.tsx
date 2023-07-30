import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFieldPassword,
  EuiSpacer,
} from "@elastic/eui";

const SignUpForm = () => {
  return (
    <div>
        <EuiForm component="form">
          <EuiFieldText
            icon="user"
            placeholder="Enter your username"
            aria-label="Enter your username."
          />
          <EuiSpacer size="m" />
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
          <EuiFieldPassword
            placeholder="Re-type your password"
            type="dual"
            aria-label="Re-type your  password."
          />
          <EuiSpacer size="m" />
        <EuiButton type="submit" fill style={{width: "100%"}}>
          Submit
        </EuiButton>
      </EuiForm>
    </div>
  )
}

export default SignUpForm