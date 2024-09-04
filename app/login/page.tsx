"use client"

import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addAccessTokenToLocalStorage } from "../helpers/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {

    function clearAllStorage() {
        localStorage.clear()
        sessionStorage.clear()
    }

    useEffect(() => {
        clearAllStorage()
    }, [])

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            axios.post("api/login", values).then((r) => {
                console.log(r)
                addAccessTokenToLocalStorage(r.data.data.access_token)
                router.push("/")
            }).catch((r) => {
                toast.error("invalid email or password")
            })
        },
    });

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">
                        Use your email and password to sign in
                    </p>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="user@acme.com"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="*******"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>

                    <button
                        type='submit'
                        className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                    >
                        Sign In
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        {"Don't have an account? "}
                        <Link href="/register" className="font-semibold text-gray-800">
                            Sign up
                        </Link>
                        {' for free.'}
                    </p>

                </form>

            </div>
        </div>
    );
}
