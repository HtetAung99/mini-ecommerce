import { useSession } from "next-auth/react";
import React from "react";
import { Modal } from "../../../components/modal";
import LoginForm from "./loginForm";

const Login = () => {
  const { data: session, status } = useSession();
  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
};

export default Login;
