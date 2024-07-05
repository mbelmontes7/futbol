"use client";
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Onboarding = (props: Props) => {
    return (
        <div>
            <SignedIn>
                <div>Onboarding</div>
            </SignedIn>
            <SignedOut>
                <div className="flex flex-col items-center justify-center">
                    Sign in to continue

                    <Button
                        className="mt-4"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >Sign In
                    </Button>
                </div>
            </SignedOut>
        </div>
    )
}

export default Onboarding