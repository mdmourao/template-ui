"use client"

import axios from "axios";
import { useFormik } from "formik";
import {  useRouter, useSearchParams } from "next/navigation";

export default function Register() {
    const router = useRouter()

    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    const formik = useFormik({
        initialValues: {
            token: '',
        },
        onSubmit: values => {
            axios.post("/api/verify/email", { token: values.token, email: email }).then((r) => {
                router.push(`/login`)
            }).catch((r) => {
                console.log(r)
                console.log("ERROR")
            })
        },
    });

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Validate Account</h3>
                    <p className="text-sm text-gray-500">
                        Email was send to you.
                    </p>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Code
                        </label>
                        <input
                            id="token"
                            name="token"
                            type="token"
                            placeholder="0000000"
                            onChange={formik.handleChange}
                            value={formik.values.token}
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>

                    <button
                        type='submit'
                        className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                    >
                        Validate
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Resend?
                    </p>

                </form>

            </div>
        </div>
    );
}
