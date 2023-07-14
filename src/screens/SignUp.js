import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import { styled } from "styled-components";
import { FatLink } from "../components/shared";
import PageTitle from "../components/pageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: { ...data },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", { required: "First Name is required" })}
            onFocus={clearLoginError}
            type="text"
            placeholder="First Name"
            error={errors?.firstName?.message ? 1 : 0}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            onFocus={clearLoginError}
            type="text"
            placeholder="Last Name"
            error={errors?.lastName?.message ? 1 : 0}
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            {...register("email", { required: "Email is required" })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Email"
            error={errors?.email?.message ? 1 : 0}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("username", { required: "Username is required" })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username"
            error={errors?.username?.message ? 1 : 0}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required" })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            error={errors?.password?.message ? 1 : 0}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta={"Have an account?"}
        link={routes.home}
        linkText={"Log in"}
      />
    </AuthLayout>
  );
}

export default SignUp;
