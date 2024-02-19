import React from "react";
import SignUpForm from "./signup-form";
import { Modal } from "@/app/components/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./signin-form";

function AuthTabFrom() {
  return (
    <Modal>
      <Tabs defaultValue="signIn" className="md:w-[25vw]">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </Modal>
  );
}

export default AuthTabFrom;
