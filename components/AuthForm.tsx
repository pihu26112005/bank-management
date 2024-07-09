"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { AuthformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { getLoggedInUser, signin, signup } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import PlaidLink from './PlaidLink'
// import { signupUser } from '@/lib/actions/user.actions'


// define schema for form

const AuthForm = ({ type }: { type: string }) => {


  const router = useRouter();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const formschema = AuthformSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formschema>) => {
    setLoading(true)
    try{
      if (type === 'sign-in') {
        const userData = {
          email: data.email,
          password: data.password
        }
        const res = await signin(userData);
        if(res) router.push('/');
      } 
      else if (type === 'sign-up'){
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          state: data.state!,
          city: data.city!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }
        const newUser = await signup(userData);
        setUser(newUser);
      }
    }
    catch(e){
      console.error(e)
    }
    // try {

    //   await signupUser(data.email, data.password);
    //   alert('Sign up successful');
    // } catch (error) {
    //   console.error('Error signing up:', error);
    // }
    finally{
    setLoading(false)
    }
  }


  return (
    <section className="auth-form">
      {/* header of from  */}
      <header className="flex flex-col  gap-5 md:gap-8">
        <Link
          href='/'
          className='flex items-center gap-2 cursor-pointer mb-5'
        >
          <Image
            src='/icons/logo.svg'
            alt='home'
            width={24}
            height={24}
          />
          <h1 className='text-26 font-ibm-plex-serif text-black-1'>Bnak-APP</h1>
        </Link>
        <div className="flex flex-col items-center gap-1 md:gap-3">
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Welcome back!'
              : type === 'sign-in'
                ? 'Log in to your account'
                : 'Create an account'}
          </h1>
        </div>
      </header>
      {/* main form  */}
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
       )
        : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {type === 'sign-up' && (
                  <>
                    <div className="flex gap-4">
                      <CustomInput
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="first name"
                      />
                      <CustomInput
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="last name"
                      />
                    </div>
                    <CustomInput
                      control={form.control}
                      name="address1"
                      label="Address"
                      placeholder="Enter your address"
                    />
                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Enter your city"
                    />
                    <div className="flex gap-4">
                      <CustomInput
                        control={form.control}
                        name="state"
                        label="State"
                        placeholder="eg: Moradabad"
                      />
                      <CustomInput
                        control={form.control}
                        name="postalCode"
                        label="Postal Code"
                        placeholder="eg: 244001"
                      />
                    </div>

                    <div className="flex gap-4">
                      <CustomInput
                        control={form.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        placeholder="yyyy-mm-dd"
                      />
                      <CustomInput
                        control={form.control}
                        name="ssn"
                        label="SSN"
                        placeholder="eg: 123-45-6789"
                      />
                    </div>

                  </>
                )}

                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="email"
                />

                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="password"
                />

                <div className="flex flex-col">
                  <Button className='form-btn' type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 size={24} className='mr-2 animate-spin' /> &nbsp;Loading..
                      </>
                    )
                      : type === 'sign-in' ? 'Sign in' : 'Sign up'}
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normol text-gray-600">
                {type === 'sign-in' ? 'New to Bank-App?' : 'Already have an account?'}
              </p>
              <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                {type === 'sign-in' ? 'Sign up' : 'Sign in'}
              </Link>
            </footer>
          </>
        )
      } 
    </section>
  )
}

export default AuthForm