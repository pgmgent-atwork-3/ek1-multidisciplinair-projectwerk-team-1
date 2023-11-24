"use client";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REGISTER_USER, UPDATE_USER } from "@/lib/mutations/login";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserForm from "../components/UserForm";

const RegisterPage = () => {
  
  return (
    <UserForm 
    user={null}
    />
  )

};

export default RegisterPage;
