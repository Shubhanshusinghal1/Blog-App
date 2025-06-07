import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({ userData }))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-950 px-4">
            <div className="mx-auto w-full max-w-lg bg-gray-900 rounded-2xl p-10 border border-gray-700 shadow-xl ring-1 ring-gray-700">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-white mb-2">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-red-600 hover:text-red-700 hover:underline transition-all duration-200"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            className="bg-gray-800 text-white"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-800 text-white"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-800 text-white"
                            {...register("password", { required: true })}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md transition duration-200 py-2"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
