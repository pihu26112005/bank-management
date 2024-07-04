"use server"
// "use client"

import exp from "constants"
import { createAdminClient, createSessionClient } from "../appwrite"
import { ID } from "node-appwrite"
import { parseStringify } from "../utils"
import { cookies } from "next/headers"
import { get } from "http"

export const signin = async (data: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(data.email, data.password);
        cookies().set("bank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(session);
    }
    catch (err) {
        console.log(err)
    }
}

export const signup = async (data: SignUpParams) => {
    "use server"
    
    try {
        // console.log("data",data)
        const { account,database } = await createAdminClient();

        const newUser = await account.create(ID.unique(), data.email, data.password,`${data.firstName} ${data.lastName}` );
        if(!newUser) throw new Error("User not created")
        // console.log("newuser",newUser)
        const session = await account.createEmailPasswordSession(data.email, data.password);

        cookies().set("bank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        return parseStringify(newUser);
    }
    catch (err) {
        console.log(err)
    }
    
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user =  await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logout = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete("bank-session");
        await account.deleteSession("current");
    }
    catch (err) {
        console.log(err)
        return null;
    }
}


// import { account } from '../appwrite';

// export async function signupUser(email: string, password: string) {
//   try {
//     await account.create('unique()', email, password);
//   } catch (error) {
//     throw error;
//   }
// }
