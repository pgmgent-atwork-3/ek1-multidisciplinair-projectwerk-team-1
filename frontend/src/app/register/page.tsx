"use client"
import { useMutation } from '@apollo/client';
import { useState } from 'react'
import { REGISTER_USER } from '@/lib/mutations/login'
import { useRouter } from 'next/navigation';
  

const RegisterPage = () => {
    const [formData, setFormData] = useState({
      stamNr: '',
      email: '',
      password: '',
      voornaam: '',
      achternaam: '',
      telefoon: '',
      gsm: '',
      land: '',
      postcode: '',
      gemeente: '',
      straat: '',
      huisnummer: '',
    });
    const { push } = useRouter();
    const [registerUser] = useMutation(REGISTER_USER);
    const [errors, setErrors] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formData);
      try {
        const { data } = await registerUser({ variables: {
           stamNr: formData.stamNr, 
           email: formData.email, 
           password: formData.password,
           voornaam: formData.voornaam,
            achternaam: formData.achternaam,
            telefoon: formData.telefoon,
            gsm: formData.gsm,
            land: formData.land,
            postcode: formData.postcode,
            gemeente: formData.gemeente,
            straat: formData.straat,
            huisnummer: formData.huisnummer,
          } });
        if (data && data.register.user) {
            // Handle successful registration here
            push('/');
            console.log('registration successful')
        } else {
          // Handle registration errors here
          push('/register');
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error)
          setErrors(error.message);
      }
    };
  
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">Register</h1>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <p>{errors}</p>
            <input
              type="text"
              name="stamNr"
              placeholder="stamNr"
              value={formData.stamNr}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="voornaam"
              placeholder="Voornaam"
              value={formData.voornaam}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="achternaam"
              placeholder="Achternaam"
              value={formData.achternaam}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="telefoon"
              placeholder="Telefoon"
              value={formData.telefoon}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="gsm"
              placeholder="Gsm"
              value={formData.gsm}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="land"
              placeholder="Land"
              value={formData.land}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className='mb-4'>
            <input
              type="text"
              name="gemeente"
              placeholder="Gemeente"
              value={formData.gemeente}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="straat"
              placeholder="Straat"
              value={formData.straat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />  
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="huisnummer"
              placeholder="Huisnummer"
              value={formData.huisnummer}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"/>
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
}

export default RegisterPage