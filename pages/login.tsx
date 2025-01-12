import { NextPage } from 'next'
import { Formik, Form, Field, FormikErrors } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
})

interface LoginValues {
    email: string;
    password: string;
}

const Login: NextPage = () => {
    const router = useRouter()

    const handleSubmit = async (values: LoginValues, { setErrors }: any) => {
        try {
            const response = await axios.get(`${API_URL}/users`)
            const users = response.data
            const user = users.find((user: any) => 
                user.email === values.email && user.password === values.password 
            )

            if (user) {
                localStorage.setItem('token', '123456')
                router.push('/')
            } else {
                setErrors({ 
                    email: 'Invalid credentials',
                    password: 'Invalid credentials'
                })
            }
        } catch (error) {
            console.error('Login error:', error)
            setErrors({ 
                email: 'Server error occurred',
                password: 'Server error occurred'
            })
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-4">
                    <div className="form-container">
                        <h1 className="text-center custom-h1 mb-4">Login</h1>

                        <Formik<LoginValues>
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="email"
                                            id="email"
                                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && touched.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && touched.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-custom w-100"
                                    >
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
