import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from "@/components/ui/input"
import { AuthformSchema } from '@/lib/utils'
import { z } from "zod"
import { Control, FieldPath } from 'react-hook-form'

const formschema = AuthformSchema('sign-up');

interface CustomInputProps {
    control:Control<z.infer<typeof formschema>>,
    name:FieldPath<z.infer<typeof formschema>>,
    label:string,
    placeholder:string
}

const CustomInput = ({control,name,label,placeholder}: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input placeholder={placeholder} {...field} className='input-class' type={name==='password'?'password':'text'}/>
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput