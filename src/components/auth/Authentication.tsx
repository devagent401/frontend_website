'use client';

import { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import Button from '@/components/shared/Button';
import { Input } from '@/components/shared/forms';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface TAuthenticationProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SignInFormData {
    email: string;
    password: string;
}

interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Authentication({ isOpen, onClose }: TAuthenticationProps) {
    const { isLoggedIn, user, login, logout } = useAuth();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    // React Hook Form for Sign In
    const signInForm = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // React Hook Form for Sign Up
    const signUpForm = useForm<SignUpFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSignInSubmit: SubmitHandler<SignInFormData> = async (data) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login attempt:', data);
            // Simulate successful login
            login({ firstName: 'John', lastName: 'Doe', email: data.email });
            setIsLoading(false);
        }, 1000);
    };

    const onSignUpSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        setIsLoading(true);

        // Validate password confirmation
        if (data.password !== data.confirmPassword) {
            signUpForm.setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match'
            });
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Signup attempt:', data);
            // Simulate successful signup
            login({ firstName: data.firstName, lastName: data.lastName, email: data.email });
            setIsLoading(false);
        }, 1000);
    };

    const handleSignOut = () => {
        logout();
        signInForm.reset();
        signUpForm.reset();
        onClose();
    };

    const switchMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        signInForm.reset();
        signUpForm.reset();
        signInForm.clearErrors();
        signUpForm.clearErrors();
    };

    // Handle overlay click (outside dropdown)
    const handleOverlayClick = (e: React.MouseEvent) => {
        // Only close if clicking directly on the overlay (not on dropdown content)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle clicks inside the dropdown
    const handleDropdownClick = (e: React.MouseEvent) => {
        // Prevent any event propagation to parent elements
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Invisible overlay to capture outside clicks */}
            <div
                className="fixed inset-0 z-40 xl:absolute  bg-transparent"
                onClick={handleOverlayClick}
            />

            {/* Dropdown */}
            <div
                ref={dropdownRef}
                onClick={handleDropdownClick}
                className="absolute xl:top-full xl:right-0 right-2 xl:mt-2 xl:bottom-auto bottom-20 w-80 bg-background border border-border rounded-xs shadow-xl z-50 overflow-hidden"
            >
                {/* Content based on authentication state */}
                <div className="bg-card">
                    {isLoggedIn && user ? (
                        /* Profile Section */
                        <div>
                            <div className="bg-gradient-to-r from-primary to-primary-light p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">
                                            {user.firstName} {user.lastName}
                                        </h3>
                                        <p className="text-white/90 text-sm">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 space-y-2">
                                <button onClick={() => router.push('/dashboard')} className="w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-xs transition-colors">
                                    Dashboard
                                </button>
                                <button className="w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-xs transition-colors">
                                    My Orders
                                </button>
                                <button className="w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-xs transition-colors">
                                    Account Settings
                                </button>
                                <button className="w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-xs transition-colors">
                                    Wishlist
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-xs transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Authentication Form */
                        <div>
                            <h2 className="text-lg font-semibold text-primary px-4 pt-2">
                                {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
                            </h2>

                            <div className="p-6">
                                <form
                                    onSubmit={mode === 'signin'
                                        ? signInForm.handleSubmit(onSignInSubmit)
                                        : signUpForm.handleSubmit(onSignUpSubmit)
                                    }
                                    className="space-y-4"
                                >
                                    {/* Sign Up Fields */}
                                    {mode === 'signup' && (
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Input
                                                    id="dropdown-firstname"
                                                    type="text"
                                                    label="First Name"
                                                    {...signUpForm.register('firstName', {
                                                        required: 'First name is required'
                                                    })}
                                                    size="sm"
                                                    variant="filled"
                                                    error={signUpForm.formState.errors.firstName?.message}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    id="dropdown-lastname"
                                                    type="text"
                                                    label="Last Name"
                                                    {...signUpForm.register('lastName', {
                                                        required: 'Last name is required'
                                                    })}
                                                    size="sm"
                                                    variant="filled"
                                                    error={signUpForm.formState.errors.lastName?.message}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Email Field */}
                                    {mode === 'signin' ? (
                                        <Input
                                            id="dropdown-email"
                                            type="email"
                                            label="Email Address"
                                            {...signInForm.register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            size="sm"
                                            variant="filled"
                                            error={signInForm.formState.errors.email?.message}
                                        />
                                    ) : (
                                        <Input
                                            id="dropdown-email"
                                            type="email"
                                            label="Email Address"
                                            {...signUpForm.register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            size="sm"
                                            variant="filled"
                                            error={signUpForm.formState.errors.email?.message}
                                        />
                                    )}

                                    {/* Password Field */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-foreground">Password</span>
                                            {mode === 'signin' && (
                                                <button
                                                    type="button"
                                                    className="text-sm text-primary hover:text-primary-light transition-colors"
                                                >
                                                    Forgot Password?
                                                </button>
                                            )}
                                        </div>
                                        {mode === 'signin' ? (
                                            <Input
                                                id="dropdown-password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...signInForm.register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must be at least 6 characters'
                                                    }
                                                })}
                                                size="sm"
                                                variant="filled"
                                                error={signInForm.formState.errors.password?.message}
                                                rightIcon={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="p-1 hover:bg-background rounded-sm transition-colors"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-4 h-4 text-foreground/60" />
                                                        ) : (
                                                            <Eye className="w-4 h-4 text-foreground/60" />
                                                        )}
                                                    </button>
                                                }
                                            />
                                        ) : (
                                            <Input
                                                id="dropdown-password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...signUpForm.register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must be at least 6 characters'
                                                    }
                                                })}
                                                size="sm"
                                                variant="filled"
                                                error={signUpForm.formState.errors.password?.message}
                                                rightIcon={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="p-1 hover:bg-background rounded-sm transition-colors"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-4 h-4 text-foreground/60" />
                                                        ) : (
                                                            <Eye className="w-4 h-4 text-foreground/60" />
                                                        )}
                                                    </button>
                                                }
                                            />
                                        )}
                                    </div>

                                    {/* Confirm Password Field for Sign Up */}
                                    {mode === 'signup' && (
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-foreground">Confirm Password</span>
                                            </div>
                                            <Input
                                                id="dropdown-confirm-password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                {...signUpForm.register('confirmPassword', {
                                                    required: 'Please confirm your password'
                                                })}
                                                size="sm"
                                                variant="filled"
                                                error={signUpForm.formState.errors.confirmPassword?.message}
                                                rightIcon={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="p-1 hover:bg-background rounded-sm transition-colors"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="w-4 h-4 text-foreground/60" />
                                                        ) : (
                                                            <Eye className="w-4 h-4 text-foreground/60" />
                                                        )}
                                                    </button>
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isLoading || (mode === 'signin' ? !signInForm.formState.isValid : !signUpForm.formState.isValid)}
                                        className="w-full bg-secondary-deep hover:bg-secondary-deep/90 text-white font-semibold mt-4"
                                    >
                                        {isLoading
                                            ? (mode === 'signin' ? 'SIGNING IN...' : 'CREATING ACCOUNT...')
                                            : (mode === 'signin' ? 'LOGIN' : 'CREATE ACCOUNT')
                                        }
                                    </Button>
                                </form>

                                {/* Toggle Mode */}
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-foreground/70">
                                        {mode === 'signin' ? "Don't have account? " : "Already have an account? "}
                                        <button
                                            type="button"
                                            onClick={switchMode}
                                            className="text-secondary-deep hover:text-secondary-deep/80 font-semibold transition-colors"
                                        >
                                            {mode === 'signin' ? 'CREATE ACCOUNT' : 'SIGN IN'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
