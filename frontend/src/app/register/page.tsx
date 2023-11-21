"use client";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REGISTER_USER, UPDATE_USER } from "@/lib/mutations/login";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    stamNr: "",
    email: "",
    password: "",
    voornaam: "",
    achternaam: "",
    telefoon: "",
    gsm: "",
    land: "",
    postcode: "",
    gemeente: "",
    straat: "",
    huisnummer: "",
  });
  const { push } = useRouter();
  const [registerUser] = useMutation(REGISTER_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [errors, setErrors] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value.length);
    if (name === "stamNr" && value.length >= 2) {
      const firstLetterCheck = value.slice(0, 1);
      const secondLetterCheck = value.slice(1, 2);
      const firstLetter = "f";
      const secondLetter = formData.achternaam.slice(0, 1);
      if (
        firstLetterCheck != firstLetter ||
        secondLetterCheck != secondLetter
      ) {
        alert(
          "Stamnummer moet beginnen met de eerste letter van de achternaam"
        );
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
    if (name !== "stamNr" || value.length <= 2) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");
    setEmailError("");
    setPasswordError("");
    if (formData.stamNr.length < 5) {
      alert("Stamnummer moet minstens 5 cijfers bevatten");
    } else {
      let registerData;
      try {
        registerData = await registerUser({
          variables: {
            username: formData.email,
            email: formData.email,
            password: formData.password,
          },
        });
      } catch (error) {
        if (error instanceof Error){
          if(error.message.includes("Email")){
            setEmailError(error.message);
          }else if(error.message.includes("password")){
            setPasswordError(error.message);
          }
      }
    }
      if (registerData?.data.register.user.id) {
        try {
          const { data } = await updateUser({
            variables: {
              id: registerData.data.register.user.id,
              stamNr: formData.stamNr,
              voornaam: formData.voornaam,
              achternaam: formData.achternaam,
              telefoon: formData.telefoon,
              gsm: formData.gsm,
              land: formData.land,
              postcode: formData.postcode,
              gemeente: formData.gemeente,
              straat: formData.straat,
              huisnummer: formData.huisnummer,
            },
          });
          if (data && data.register) {
            // Handle successful registration here
            push("/");
            console.log("registration successful");
          } else {
            // Handle registration errors here
            push("/register");
          }
        } catch (error) {
          if(!emailError || !passwordError){
            if (error instanceof Error) setErrors(error.message);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Register</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        {errors && <p className="text-red-500">{errors}</p>}
        <div className="mb-4 flex">
          <input
            type="text"
            name="voornaam"
            required
            placeholder="Voornaam"
            value={formData.voornaam}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
         
        </div>
        <div className="mb-4 flex">
          <input
            type="text"
            name="achternaam"
            required
            placeholder="Achternaam"
            value={formData.achternaam}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        {emailError && <p className="text-red-500">{emailError}</p>}
        <div className="mb-4 flex">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <div className="mb-4 flex">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="text"
            name="stamNr"
            placeholder="StamNr"
            required
            value={formData.stamNr}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        
        <div className="mb-4 flex">
          <input
            type="text"
            name="land"
            required
            placeholder="Land"
            value={formData.land}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="number"
            name="postcode"
            required
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="text"
            name="gemeente"
            required
            placeholder="Gemeente"
            value={formData.gemeente}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="text"
            name="straat"
            required
            placeholder="Straat"
            value={formData.straat}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="number"
            name="huisnummer"
            required
            placeholder="Huisnummer"
            value={formData.huisnummer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/required_4e5590661b.jpg`}
            alt="required"
            width={111}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="telefoon"
            placeholder="Telefoon"
            value={formData.telefoon}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            style={{ maxWidth: "332px" }}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="gsm"
            placeholder="Gsm"
            value={formData.gsm}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            style={{ maxWidth: "332px" }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
